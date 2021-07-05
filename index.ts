import { ClientConfig, Client, middleware, MiddlewareConfig, WebhookEvent, TextMessage, MessageAPIResponseBase, FlexBubble, FlexMessage } from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';
import { textEventHandler } from './src/controllers/lineController';
import * as cron from 'node-cron';
import { trendingMovieDay } from './src/services/TMDB/movieService';
import { cardCarousel } from './src/utils/messageHelper';
import { trendingTVDay } from './src/services/TMDB/tvService';

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET,
};

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET || '',
};

const PORT = process.env.PORT || 3000;

const client = new Client(clientConfig);

const app: Application = express();

cron.schedule('40 20 * * *', async () => {
  const trendingMovie = await trendingMovieDay();
  const carouselMovie:FlexMessage = await cardCarousel(trendingMovie.results);
  await client.pushMessage(`${process.env.LINE_MY_USER_ID}` , carouselMovie);

  const trendingTV = await trendingTVDay();
  const carouselTV:FlexMessage = await cardCarousel(trendingTV.results);
  await client.pushMessage(`${process.env.LINE_MY_USER_ID}` , carouselTV);

  var date = new Date();
  console.log(date.getMinutes() );
  console.log(date.getHours());
});

app.get(
  '/',
  async (_: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
      status: 'success',
      message: 'Connected successfully!',
    });
  }
);


// This route is used for the Webhook.
app.post(
  '/webhook',
  middleware(middlewareConfig),
  async (req: Request, res: Response): Promise<Response> => {
    const events: WebhookEvent[] = req.body.events;

    // Process all of the received events asynchronously.
    const results = await Promise.all(
      events.map(async (event: WebhookEvent) => {
        try {
          await textEventHandler(event , client);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }

          // Return an error message.
          return res.status(500).json({
            status: 'error',
          });
        }
      })
    );

    // Return a successfull message.
    return res.status(200).json({
      status: 'success',
      results,
    });
  }
);

// Create a server and listen to it.
app.listen(PORT, () => {
  console.log(`Application is live and listening on port ${PORT}`);
});
