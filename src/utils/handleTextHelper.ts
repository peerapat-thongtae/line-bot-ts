import { Client, FlexCarousel, FlexMessage, Message, TextMessage, WebhookEvent } from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';
import * as BookmarkService from '../../src/services/bookmarkService';
import * as MovieService from '../../src/services//TMDB/movieService';
import { cardCarousel, cardMedia } from '../../src/utils/messageHelper';
import { JobInterface } from '../models/JobModel';

export const getMoviePopular = async (replyToken:string , client:Client) => {
  const movies = await MovieService.discoverMovie();
    console.log(movies.results.length);
    let replyArr = [];
    let te = '';
    for(let i = 0; i<movies.results.length; i++) {
        if(i < 3) {
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

export const sendMedia = async (replyToken:string , client:Client , datas:any) => {
    const responseCarousel:FlexMessage = await cardCarousel(datas.results);
    await client.replyMessage(replyToken , responseCarousel);
}

export const sendText = async <T extends JobInterface> (replyToken : string , client:Client , datas :T[]):Promise<void> => {

  let text = '';
  for (let i = 0 ; i < datas.length ; i++) {
    text += `- ${datas[i].jobName} (${datas[i].companyName} > ${datas[i].location}) : www.jobthai.com${datas[i].link}\r\n`;
  }
  const responseText:TextMessage = {
    type : "text" ,
    text : text,
  }
  await client.replyMessage(replyToken , responseText);
}