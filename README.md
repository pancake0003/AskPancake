# AskPancake
 my 24/7 Q&A website

 author: Joy Song

# process & docs
## development
I wanted to create a website that would be my Q&A site 24/7. The inspiration comes from [profg.ai](https://profg.ai/). I think that this is an interesting way of communication (through a type of miscommunication and misinterpretation). 

I started off with building a simple ui and a base model that would return "Sure! Let me help you with" and whatever the user input was. 

<img width="661" alt="Screen Shot 2023-12-12 at 11 47 03 AM" src="https://github.com/pancake0003/AskPancake/assets/146360951/8e4f61b9-dd57-405c-bf4a-ec2c0b1145b5">

After integrating Openai methods and API, i started with having the ai return answers with a simple command: "You are a cat, reply with cat language". 

<img width="654" alt="Screen Shot 2023-12-12 at 11 42 55 AM" src="https://github.com/pancake0003/AskPancake/assets/146360951/9258a4ed-afb7-4aa2-b340-911fcbac1130">

This indicated that I have successfully made openai respond to my server's user prompts!

after that, I decided to insert a txt file that i've written before hand to train the ai to behave like me. Training the ai took 4 days and it was a tedious process trying to encode many features (though i eventually abandoned most)

<img width="673" alt="Screen Shot 2023-12-12 at 12 31 48 PM" src="https://github.com/pancake0003/AskPancake/assets/146360951/7716f3df-71c4-459b-abac-1520f49c61d3">

(here's the ai trying to imitate me)(pretty successful)

the json file looks like this:

<img width="698" alt="Screen Shot 2023-12-12 at 12 31 58 PM" src="https://github.com/pancake0003/AskPancake/assets/146360951/bf92351e-5a4b-4549-8e49-5a7caaa2ba2e">

## front end
I started with changing the UI:

![WechatIMG112300](https://github.com/pancake0003/AskPancake/assets/146360951/068a337b-a8f1-449c-8c19-65302b13b276)
<img width="1439" alt="Screen Shot 2023-12-12 at 4 17 05 PM" src="https://github.com/pancake0003/AskPancake/assets/146360951/a41a06ca-f6f9-415f-b6e6-17d2c1227bd1">

settling on a desirable UI, which randomly switches between emotes when given an answer:

<img width="1432" alt="Screen Shot 2023-12-12 at 4 34 03 PM" src="https://github.com/pancake0003/AskPancake/assets/146360951/08cba829-e191-4719-a54c-d8160d7f0a47">

Some stressful and despairing debug process :')

![image](https://github.com/pancake0003/AskPancake/assets/146360951/5e3adac8-b3bd-477e-9e2f-1fa61d530a35)

![image1](https://github.com/pancake0003/AskPancake/assets/146360951/ceafe869-4bb6-4fbf-9e2a-0b13c5f7bd34)

And finally, a desired outcome. 

<img width="1436" alt="Screen Shot 2023-12-13 at 12 06 45 AM" src="https://github.com/pancake0003/AskPancake/assets/146360951/efdbd63e-dccc-484b-9747-defeb2fc05d4">

## debugging
After finishing most of the back-end stuff, and successfully uploading everything to Digital Ocean and hosting it on a public server, I decided it's time to "playtest" the site, so I invited 6 friends to try out the website and see. Eventually they overachieved and completely broke the website! XD the whole process of debugging took me more than 10 hours...

<img width="1427" alt="Screen Shot 2023-12-13 at 1 56 16 AM" src="https://github.com/pancake0003/AskPancake/assets/146360951/de541d07-f4e7-4547-b8b6-bd76c5b5bb39">

Initially, I was trying to fix the instructions txt file so that the ai wouldn't keep giving in to my friends and start telling them that it's an ai assistant. After fixing the txt file, I decided to upgrade the model to gpt 4, and it turned out to be a great choice, since gpt 4 is a lot smarter and cuter. However, after all of this, the website eventually wouldn't reply with anything other than Internal Server Error. I checked pm2 logs and saw this:

<img width="1103" alt="Screen Shot 2023-12-12 at 11 58 21 PM" src="https://github.com/pancake0003/AskPancake/assets/146360951/0807aa43-5f8f-4487-a300-30dc4454e437">

After spending another half day decrypting everything and understanding rate limits, I thought i was not paying enough so i increased the quota, however the server broke again in just a few minutes. I debugged for another 4 hours and eventually found out that it was because my instructions txt file was too long (yes it was 4 pages). Each time the ai tries to reply to a message, it reads from the txt file and this process would use a lot of tokens, eventually causing it to not be able to send any messages. I quickly updated the txt file and made it extremely short. For safety purpose I also downgraded gpt 4 back to 3.5. 

The drawback of this is that the ai no longer knows my hobbies and stories, and is significantly less intelligent, but there's no work-around currently se we'll have to bear with it. :')

## pwa
After finishing all this, I moved on to making this website a pwa. It was all fun and games until i tried to implement my suceessful localhost trial to my online server. Somehow it just wouldn't show the pwa option. There is no error logs whatsoever, and I debugged for another day on the issue, but eventually just failed to find a reason. :(((
My Laptop localhost and phone works just fine, as shown:

laptop:

<img width="449" alt="Screen Shot 2023-12-14 at 7 19 49 AM" src="https://github.com/pancake0003/AskPancake/assets/146360951/eed48332-700a-414e-b4fc-6dd60f49a8aa">

<img width="1220" alt="Screen Shot 2023-12-14 at 7 19 33 AM" src="https://github.com/pancake0003/AskPancake/assets/146360951/3658acc0-33ee-43cc-8e7a-752eda15d314">

phone:

![IMG_6693](https://github.com/pancake0003/AskPancake/assets/146360951/d41f1cc3-5c6c-42d0-848b-06d1e4a9fc4a)

![IMG_6694](https://github.com/pancake0003/AskPancake/assets/146360951/168f61c8-3ca9-4e3e-bb61-3e22d2680791)

## website
here's my final website [AskPancake](http://24.144.64.246:4000/)! Enjoy!
