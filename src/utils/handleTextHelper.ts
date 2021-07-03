import { Client, FlexMessage, TextMessage, WebhookEvent } from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';
import * as BookmarkService from '../../src/services/bookmarkService';
import * as MovieService from '../../src/services//TMDB/movieService';
import { cardMedia } from '../../src/utils/messageHelper';

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
  let replyArr = [];
    let te = '';
    for(let i = 0; i<datas.results.length; i++) {
        if(i < 3) {
          const responseFlex: FlexMessage = cardMedia(datas.results[i]);
          replyArr.push(responseFlex);
        } else {
          te += `${datas.results[i].title}\r\n`;
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