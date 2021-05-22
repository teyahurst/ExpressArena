const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    console.log('The root path was called');
    res.send('Hello Express!');
})

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!')
});

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!')
})

app.get('/pizza/pineapple', (req, res) => {
    res.send("We don't serve that here. Never call again!")
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
    res.send(responseText);
  });

  app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
  });

  app.get('/greetings', (req, res) => {
      //1. get the name, race values from the request
      const name = req.query.name;
      const race = req.query.race;

      //2. validate the values
      if(!name){
        //3. if a name is not provided
        return res.status(400).send('Please provide a name')
      }

      if(!race){
        //3. if a race is not provided
        return res.status(400).send('Please provide a race')
      }

      //4. and 5. both name and race are valid so do the processing

      const greetings = `Greetings ${name} the ${race}, welcome to our kingdom. `;

      //6. send the response
      res.send(greetings)
  })






  //the following is the drills for the assignment


  //drill number 1
  app.get('/sum', (req, res) => {
      //get the values
      const {a, b} = req.query;

      //validation
      if(!a){
          //if a doesnt have a value
          return res    
                    .status(400)
                    .send('a is required')
      }

      if(!b){
          //if b doesnt have a value 
          return res 
                    .status(400)
                    .send('b is required')
      }

      const numberA = parseInt(a);
      const numberB = parseInt(b)

      if(Number.isNaN(numberA)){
          //if the value of a is not a number
          return res
                    .status(400)
                    .send('a must be a number')
      }

      if(Number.isNaN(numberB)){
          //if the value of b is not a number
          return res
                    .status(400)
                    .send('b must be a number')
      }

      //if values are valid, do the process
      const c = numberA + numberB;

      //the response value
      const sum = `The sum of ${numberA} and ${numberB} is ${c}`;

      //send the response
      res.send(sum)

  })

  //drill number 2 
  app.get('/cipher', (req, res) => {
      //get the values
      const {text, shift} = req.query;

      //validations
      if(!text){
          return res    
                    .status(400)
                    .send('text is required')
      }

      if(!shift){
          return res    
                    .status(400)
                    .send('shift is required')
      }

      const numberShift = parseInt(shift);

      if(Number.isNaN(numberShift)){
          return res
                    .status(400)
                    .send('shift must be a number')
      }

      const base = 'A'.charCodeAt(0);

      const cipher = text
                        .split('')
                        .map(char => {
                            const code = char.charCodeAt(0);
                            
                             


                            let difference = code - base;
                            difference = difference + numberShift;

                            difference = difference % 26;
                            

                            const shiftedChar = String.fromCharCode(base + difference);
                            
                            return shiftedChar;

                        })
                        .join('');

            res.send(cipher)
      
  })

  //drill number 3
  app.get('/lotto', (req, res) => {
      //get the values
      const {numbers} = req.query

      //validations:
      //1. {numbers} must exist
      //2. has to be an array 
      //3. must be 6 numbers
      //4. has to be between 1-20

      if(!numbers){
          return res
                    .status(400)
                    .send('numbers must be an array')
      }

      const guesses = numbers
                        .map(num => parseInt(num))
                        .filter(num => !Number.isNaN(num) && (num >= 1 && num <= 20));

      if(guesses.length != 6){
          return res
                    .status(400)
                    .send('numbers must contain 6 numbers between 1 and 20')
      }

      //here are the 20 numbers to choose from
      const stockNums = Array(20).fill(1).map((_, i) => i + 1);

      //randomly chooses 6
      const winningNums = [];

      for(let i = 0; i < 6; i++){
          const random = Math.floor(Math.random() * stockNums.length);
          winningNums.push(stockNums[random]);
          stockNums.splice(random, 1);
      }

      //compares the guesses to the winning numbers
      let difference = winningNums.filter(n => !guesses.includes(num))

      let responseText;

      switch(difference.length){
          case 0:
            responseText = 'Wow! Unbelievable! You could have won the mega millions!';
            break;
          case 1: 
            responseText = 'Congratulations! You win $100';
            break;
          case 2:
            responseText = 'Congratulations, you win a free ticket';
            break;
          default:
              responseText = 'Sorry you lose';
      }

      res.json({
          guesses, winningNumbers, difference, responseText
      })

    res.send(responseText);

  })

app.listen(8000, () => {
    console.log('Express server is listening on port 8000');
})