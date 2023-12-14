# AskPancake
 my 24/7 Q&A website

## process & docs
I wanted to create a website that would be my Q&A site 24/7. The inspiration comes from [profg.ai](https://profg.ai/). I think that this is an interesting way of communication (through a type of miscommunication and misinterpretation). 

I started off with building a simple ui and a base model that would return "Sure! Let me help you with" and whatever the user input was. 
<img width="661" alt="Screen Shot 2023-12-12 at 11 47 03 AM" src="https://github.com/pancake0003/AskPancake/assets/146360951/8e4f61b9-dd57-405c-bf4a-ec2c0b1145b5">

After integrating Openai methods and API, i started with having the ai return answers with a simple command: "You are a cat, reply with cat language". 
<img width="654" alt="Screen Shot 2023-12-12 at 11 42 55 AM" src="https://github.com/pancake0003/AskPancake/assets/146360951/9258a4ed-afb7-4aa2-b340-911fcbac1130">
This indicated that I have successfully made openai respond to my server's user prompts!

after that, I decided to insert a txt file that i've written before hand to train the ai to behave like me. Training the ai took 4 days and it was a tedious process trying to encode many features (though i eventually abandoned most)
<img width="673" alt="Screen Shot 2023-12-12 at 12 31 48 PM" src="https://github.com/pancake0003/AskPancake/assets/146360951/7716f3df-71c4-459b-abac-1520f49c61d3">
(here's the ai trying to imitate me)

the json file looks like this:
<img width="698" alt="Screen Shot 2023-12-12 at 12 31 58 PM" src="https://github.com/pancake0003/AskPancake/assets/146360951/bf92351e-5a4b-4549-8e49-5a7caaa2ba2e">

Then, i moved on to the front end, starting with changing the UI:
![WechatIMG112300](https://github.com/pancake0003/AskPancake/assets/146360951/068a337b-a8f1-449c-8c19-65302b13b276)
<img width="1439" alt="Screen Shot 2023-12-12 at 4 17 05 PM" src="https://github.com/pancake0003/AskPancake/assets/146360951/a41a06ca-f6f9-415f-b6e6-17d2c1227bd1">

settling on a desirable UI, which randomly switches between emotes when given an answer:
<img width="1432" alt="Screen Shot 2023-12-12 at 4 34 03 PM" src="https://github.com/pancake0003/AskPancake/assets/146360951/08cba829-e191-4719-a54c-d8160d7f0a47">

Some stressful and despairing debug process :')
![image](https://github.com/pancake0003/AskPancake/assets/146360951/5e3adac8-b3bd-477e-9e2f-1fa61d530a35)

![image1](https://github.com/pancake0003/AskPancake/assets/146360951/ceafe869-4bb6-4fbf-9e2a-0b13c5f7bd34)

And finally, a desired outcome. 