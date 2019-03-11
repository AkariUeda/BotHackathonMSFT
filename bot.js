// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes, CardFactory } = require('botbuilder');

const fs = require('fs');

class MyBot {
    /**
     *
     * @param {TurnContext} on turn context object.
     * 
     * 
     */
    constructor(){
        this.episode_file = fs.readFileSync('naruto.tsv').toString().split("\n").map(line => line.split('\t'));
        // console.log(this.episode_file[2]);
        this.episode_url = fs.readFileSync('episodes.txt').toString().split("\n");
        // console.log(this.episode_url[0])
        this.first = true;
    }

    async onTurn(turnContext) {


        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {


            let episode_title = this.episode_file[(parseInt(turnContext.activity.text)-1) * 3];
            let episode_summary = this.episode_file[(parseInt(turnContext.activity.text)-1) * 3 + 2];
            let url = this.episode_url[(parseInt(turnContext.activity.text)-1)];

            // const card = CardFactory.signinCard(
                
            //     `Watch it at Crunchyroll`,
            //     `https://www.crunchyroll.com/${ url }`,
            //     `You're looking for episode ${ episode_title[0] } - ${ episode_title[1] }:\n\n ${ episode_summary[0] }`
            // );

            const card = CardFactory.thumbnailCard(
                `${ episode_title[0] } - ${ episode_title[1] }`,
                `${ episode_summary[0] }`,
                [`https://www.einerd.com.br/wp-content/uploads/2017/10/Naruto_Uzumaki.jpg`],
                [`https://www.crunchyroll.com/${ url }`]
            );

            await turnContext.sendActivity({attachments: [card]});

            // await turnContext.sendActivity(`You're looking for episode ${ episode_title[0] } - ${ episode_title[1] }`);
            // await turnContext.sendActivity(`Summary: ${ episode_summary[0] }`);
            // await turnContext.sendActivity(`Watch it at: https://www.crunchyroll.com/${ url }`);


        } else if  (turnContext.activity.type === ActivityTypes.ConversationUpdate && this.first) {
            this.first = false;
            await turnContext.sendActivity(`Which episode do you wanna watch today dattebayo?`);
        }
    }
}

module.exports.MyBot = MyBot;
