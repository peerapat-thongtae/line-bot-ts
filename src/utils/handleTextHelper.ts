import { Client, FlexMessage, TextMessage, WebhookEvent } from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';
import * as BookmarkService from '../../src/services/bookmarkService';
import * as MovieService from '../../src/services//TMDB/movieService';
import { cardMedia } from '../../src/utils/messageHelper';

export const getMoviePopular = async (replyToken:string , client:Client) => {
  const movies = await MovieService.discoverMovie();
    console.log(movies);
    let replyArr = [];
    for(let i = 0; i<movies.results.length ; i++) {
      if(i < 6) {
        const response: FlexMessage = cardMedia(movies.results[i]);
        replyArr.push(response);
      } else {
        const text: TextMessage = {
          type : "text",
          text : movies.results[i].title
        }
        // replyArr.push(text);
      }
    }
    await client.replyMessage(replyToken, replyArr);
}