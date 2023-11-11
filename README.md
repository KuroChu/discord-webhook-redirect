# Discord Webhook Redirect

Just a little proof of concept project

Create a POST request with the following structure:

`https://example.com/?webhook-path=examplePat&discord-webhook-url=UrlEncodedDiscordWebhookUrl&is-embed=true`

webhook-path is for using multiple webhooks at the same time.

discord-webhook-url is pretty self explaining.(It has to be URL encoded to work)

is-embed can be true or false and will create an simple embed of the request (false by default if left empty)
