import type { APIRoute } from 'astro';
import {
  BandsintownEventsResponseSchema,
  type TourEventsAPIResponse,
  type TourEvent
} from '@/types/bandsintown';

const BANDSINTOWN_API_BASE = 'https://rest.bandsintown.com';
const ARTIST_NAME = 'In Thorns';

export const GET: APIRoute = async ({ url }) => {
  try {
    const apiKey = import.meta.env.BANDS_IN_A_TOWN_API_KEY;

    if (!apiKey) {
      console.error('BANDS_IN_A_TOWN_API_KEY is not configured');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'API configuration error',
        } satisfies TourEventsAPIResponse),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Build Bandsintown API URL
    const bandsintownUrl = new URL(
      `/artists/${encodeURIComponent(ARTIST_NAME)}/events`,
      BANDSINTOWN_API_BASE
    );
    bandsintownUrl.searchParams.set('app_id', apiKey);

    // Optional: support date filtering from query params
    const dateParam = url.searchParams.get('date');
    if (dateParam) {
      bandsintownUrl.searchParams.set('date', dateParam);
    }

    // Fetch from Bandsintown
    const response = await fetch(bandsintownUrl.toString(), {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Bandsintown API error: ${response.status} - ${errorText}`);

      return new Response(
        JSON.stringify({
          success: false,
          error: `Failed to fetch events from Bandsintown: ${response.status}`,
        } satisfies TourEventsAPIResponse),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const rawData = await response.json();

    // Validate response with Zod
    const validationResult = BandsintownEventsResponseSchema.safeParse(rawData);

    if (!validationResult.success) {
      console.error('Bandsintown response validation failed:', validationResult.error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid response format from Bandsintown',
        } satisfies TourEventsAPIResponse),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Transform data for frontend
    const events: TourEvent[] = validationResult.data.map((event) => {
      // Find ticket URL from offers
      const ticketOffer = event.offers.find(offer =>
        offer.type.toLowerCase().includes('ticket') &&
        offer.status === 'available'
      );

      // Format date for display
      const eventDate = new Date(event.datetime);
      const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      return {
        id: event.id,
        date: formattedDate,
        datetime: event.datetime,
        venue: event.venue.name,
        city: event.venue.city,
        region: event.venue.region,
        country: event.venue.country,
        ticketUrl: ticketOffer?.url,
        eventUrl: event.url,
        description: event.description,
      };
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: events,
      } satisfies TourEventsAPIResponse),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200', // Cache for 1 hour
        }
      }
    );

  } catch (error) {
    console.error('Unexpected error in events API:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
      } satisfies TourEventsAPIResponse),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
