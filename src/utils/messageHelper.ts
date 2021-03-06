import { FlexBubble, FlexCarousel, FlexMessage } from "@line/bot-sdk";
import { MovieInterface } from "../models/movieModel";


export const cardMedia = (movie:MovieInterface) => {
  const flex:FlexMessage = {
    type: "flex",
    altText: 'Get media',
    contents : {
      type: "bubble",
      size: "giga",
      direction : "ltr",
      hero : {
        "type": "image",
        "url": `${process.env.TMDB_IMAGE_PATH}/${movie.backdrop_path}`,
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": `${movie.title} (${movie.vote_average})`,
            "weight": "bold",
            "size": "xl"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "lg",
            "spacing": "sm",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "Title",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 1
                  },
                  {
                    "type": "text",
                    "text": movie.title,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "Release date",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 1
                  },
                  {
                    "type": "text",
                    "text": movie.release_date,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "Overview",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 1
                  },
                  {
                    "type": "text",
                    "text": movie.overview,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "style": "link",
            "height": "sm",
            "action": {
              "type": "uri",
              "label": "Detail",
              "uri": `${process.env.TMDB_URL}/movie/${movie.id}`
            }
          },
          
          {
            "type": "spacer",
            "size": "sm"
          }
        ],
        "flex": 0
      }
    }
  }
  return flex;
}

export const cardCarousel = async (datas:any) => {
  let i = 0;
  const carouselArr:Array<FlexBubble> = [];

  for(let i = 0 ; i<10 ; i++ ) {
    carouselArr.push(
      {
      type: "bubble",
      size: "giga",
      direction : "ltr",
      hero : {
        "type": "image",
        "url": `${process.env.TMDB_IMAGE_PATH}/${datas[i].backdrop_path}`,
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": `${datas[i].title || datas[i].name}`,
            "weight": "bold",
            "size": "xl"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "lg",
            "spacing": "sm",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "md",
                "contents": [
                  {
                    "type": "text",
                    "text": "Title",
                    "color": "#aaaaaa",
                    "size": "md",
                    "flex": 2
                  },
                  {
                    "type": "text",
                    "text": datas[i].title || datas[i].name,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "md",
                "contents": [
                  {
                    "type": "text",
                    "text": "Release date",
                    "color": "#aaaaaa",
                    "size": "md",
                    "flex": 2
                  },
                  {
                    "type": "text",
                    "text": datas[i].release_date || datas[i].first_air_date,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "md",
                "contents": [
                  {
                    "type": "text",
                    "text": "Overview",
                    "color": "#aaaaaa",
                    "size": "md",
                    "flex": 2
                  },
                  {
                    "type": "text",
                    "text": datas[i].overview,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "style": "link",
            "height": "sm",
            "action": {
              "type": "uri",
              "label": "Detail",
              "uri": `${process.env.TMDB_URL}/${datas[i].media_type || 'movie'}/${datas[i].id}`
            }
          },
          
          {
            "type": "spacer",
            "size": "sm"
          }
        ],
        "flex": 0
      }
      }
    );
  }
  const carousel:FlexMessage = {
    "type": "flex",
    "altText" : "test",
    "contents" : {
      type : "carousel",
      "contents" : carouselArr
    }
  }
  return carousel;
}
