# Favorites management

Using channels response from `channels.json` implement favorites management UI
similar to [example](https://zattoo-abox-staging.zattoo.com/settings/favorites?login=00007733&password=12345).
Once task is ready we are going to provide access to our private GitHub repo where you would be able to submit it for the review.


## Requirements
- filter duplicated channels from the response
- use best available quality (`uhd` > `hd` > `sd`)
- only channels with availability === available should be in the list
- render all channels in two columns
- Each rendered channel item should have number, logo, title, quality and display inFavorites status
- enable keyboard navigation
- highlight selected item
- on Enter key add item to favotites list / or remove when it is already in the list


## Hints
To get channel logo use `logo_token` from the response (example `https://images.zattic.com/logos/93b42a0d35defc25ca42/white/240x135.png`)
