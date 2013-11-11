# Emulator

A simple server for emulating an API.

Install through npm:

    npm install -g emulator

## Usage

### API response simulation

Emulator is a simple server that allows for rapid prototyping of client-side applications.

Make any request:

    http://localhost:3000/profile?user=me

    $.ajax('http://localhost:3000/profile', {
      data: {user: 'me'}
    });

And get the same response data:

    {user: 'me'}

Or specify a different response:

    http://localhost:3000/profile?user=me&response[user]=you

    $.ajax('http://localhost:3000/profile', {
      data: {
        user: 'me',
        response: {
          user: 'you'
        }
      }
    });

And get the response you specified:

    {user: 'you'}

### Other routes

Emulator also includes other helper routes that may be useful in your application.

#### Redirects

Redirect to a different url:

    http://localhost:3000/redirect/me

    http://localhost:3000/redirect?redirect=me

These routes both redirect to `http://localhost:3000/me`

#### Simulate high latentcy or long response times

Force the server to simulate long response times:

    http://localhost:3000/wait/4000?user=me

This request would wait 4 seconds and then respond with:

    {user: me}

#### Test error codes

Test how your application would respond to error codes:

    http://localhost:3000/500

    http://localhost:3000/404

Responds with a 500 (Internal Server Error) code and a 404 (Not Found) code, respectively

## License

MIT
