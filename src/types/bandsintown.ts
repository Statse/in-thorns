import { z } from 'zod';

// Bandsintown API Response Schema
export const BandsintownVenueSchema = z.object({
  name: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  timezone: z.string().optional(),
});

export const BandsintownOfferSchema = z.object({
  type: z.string(), // e.g., "Tickets", "Watch Live"
  url: z.string().url(),
  status: z.string(), // e.g., "available", "unavailable"
});

export const BandsintownEventSchema = z.object({
  id: z.string(),
  artist_id: z.string(),
  url: z.string().url(),
  datetime: z.string(), // ISO 8601 format
  on_sale_datetime: z.string().optional(),
  description: z.string(),
  title: z.string().optional(),
  lineup: z.array(z.string()),
  venue: BandsintownVenueSchema,
  offers: z.array(BandsintownOfferSchema),
});

export const BandsintownEventsResponseSchema = z.array(BandsintownEventSchema);

// Inferred TypeScript types
export type BandsintownVenue = z.infer<typeof BandsintownVenueSchema>;
export type BandsintownOffer = z.infer<typeof BandsintownOfferSchema>;
export type BandsintownEvent = z.infer<typeof BandsintownEventSchema>;
export type BandsintownEventsResponse = z.infer<typeof BandsintownEventsResponseSchema>;

// Our API response types (simplified for frontend)
export interface TourEvent {
  id: string;
  date: string; // Formatted date string
  datetime: string; // ISO 8601
  venue: string;
  city: string;
  region: string;
  country: string;
  ticketUrl?: string;
  eventUrl: string;
  description: string;
}

export interface TourEventsAPIResponse {
  success: boolean;
  data?: TourEvent[];
  error?: string;
}
