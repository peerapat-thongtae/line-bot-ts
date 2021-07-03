import { ClientConfig, Client, middleware, MiddlewareConfig, WebhookEvent, TextMessage, MessageAPIResponseBase, FlexBubble, FlexMessage } from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';
import * as BookmarkService from '../../src/services/bookmarkService';
import * as MovieService from '../../src/services//TMDB/movieService';
import { cardMedia } from '../../src/utils/messageHelper';

export const textEventHandler = async (event: WebhookEvent , client:Client): Promise<MessageAPIResponseBase | undefined> => {
  // Process all variables here.
  console.log(event);
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }

  // Process all message related variables here.
  const { replyToken } = event;
  const { text } = event.message;
  

  if(text === 'movie popular') {
    const movies = await MovieService.discoverMovie();
    console.log(movies.results.length);
    let replyArr = [];
    let te = '';
    for(let i = 0; i<movies.results.length; i++) {
        if(i < 5) {
          const responseFlex: FlexMessage = cardMedia(movies.results[i]);
          replyArr.push(responseFlex);
        } else {
          te += `${movies.results[i].title}\r\n`;
        }
        
      
    }
    const response:TextMessage = {
      type : "text",
      text : te
    }
    replyArr.push(response);
    console.log(te);
    await client.replyMessage(replyToken, replyArr);
  }


  return;
  
};