# Promo Block

## Overview
This block is used to display promotional content and marketing messages.

## Configuration
- title: Main heading
- description: Promotional text
- ctaText: Call-to-action button text
- ctaLink: Destination URL

## Integration Details
### URL Parameters
- promoId: Loads a specific promotion

### localStorage
- promoDismissed: Stores dismissal state

### Events
- promo-loaded
- promo-clicked
- promo-dismissed

## User Flow
1. Block loads promotion content.
2. User views the promotion.
3. User clicks CTA or dismisses the promotion.
4. Events are tracked accordingly.

## Error Handling
- Fallback content displayed if API call fails.
- Invalid configuration uses default values.