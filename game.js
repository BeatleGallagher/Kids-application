enchant();
 
var width = this.screen.width;
var height = this.screen.height;

window.onload = function(){
    
    game = new Game(width,height);
    game.preload('start.png','gameover.png','ambienceFarmAnimals1.wav','catResized100x100.png','catSound5sec.wav','tigerResized100x100.png','tigerSound5sec.wav','goatResized100x100.png','goatSound.wav','rooster2Resized100x100.png','roosterSound5sec.wav','sheepResized100x100.png','sheepSound5sec.wav','pigResized100x100.png','pigSound5sec.wav','cow2Resized100x100.png','lion2Resized100x100.png','lionSound5sec.wav','monkeySound5sec.wav','monkeyResized100x100.png','bearResized100x100.png','bearSound5seconds.wav','elephant2Resized100x100.png','duck2Resized100x100.png','duckSound5sec.wav','cowSound.wav','wrongChoiceCombo1.wav','owlResized100x100.png','horse2Resized100x100.png','horseSound.wav','owlSound5sec.wav','elephantSound.wav','font0.png');

//START SCENE ON LOADUP
StartScene = Class.create(Scene,{
    initialize:function(){
    Scene.call(this,width,height);
    game.assets['ambienceFarmAnimals1.wav'].play();
    //START IMAGE WITH EVENTLISTENER TO START GAME
    startLabel = new Sprite(236,48);
    startLabel.image = game.assets['start.png'];
    startLabel.x = (screen.width / 2) - (startLabel.width / 2);
    startLabel.y = screen.height / 3.75;
    game.rootScene.addChild(startLabel);
    startLabel.addEventListener(Event.TOUCH_START,this.loadGame);

    //CLICK START TEXT LABEL 
    clickStartText = new MutableText(Math.floor(screen.width / 2) - (320 / 2), Math.floor(screen.height / 2) + startLabel.height,320);
    clickStartText.text = 'click START to begin';
    clickStartText.backgroundColor = "black";
    game.rootScene.addChild(clickStartText);

    cow = new Sprite(100,100);
    cow.image = game.assets['cow2Resized100x100.png'];
    cow.x = 0;
    cow.y = 30;
    cow.scaleX = 0.6;
    cow.scaleY = 0.6;
    cow.tl.rotateBy(-360,100).loop();
    game.rootScene.addChild(cow);

    pig = new Sprite(100,100);
    pig.image = game.assets['pigResized100x100.png'];
    pig.x = screen.width - pig.width;
    pig.y = 30;
    pig.scaleX = 0.6;
    pig.scaleY = 0.6;
    pig.tl.rotateBy(360,100).loop();
    game.rootScene.addChild(pig);

    sheep = new Sprite(100,100);
    sheep.image = game.assets['sheepResized100x100.png'];
    sheep.x = (screen.width / 2) - (sheep.width / 2);
    sheep.y = 30;
    sheep.scaleX = 0.6;
    sheep.scaleY = 0.6;
    sheep.tl.rotateBy(-360,100).loop();
    game.rootScene.addChild(sheep);

    lion = new Sprite(100,100);
    lion.image = game.assets['lion2Resized100x100.png'];
    lion.x = 0;
    lion.y = (screen.height / 3) + (lion.height / 3);
    lion.scaleX = 0.6;
    lion.scaleY = 0.6;
    lion.tl.rotateBy(360,100).loop();
    game.rootScene.addChild(lion);

    monkey = new Sprite(100,100);
    monkey.image = game.assets['monkeyResized100x100.png'];
    monkey.x = screen.width - pig.width;
    monkey.y = (screen.height / 3) + (monkey.height / 3);
    monkey.scaleX = 0.6;
    monkey.scaleY = 0.6;
    monkey.tl.rotateBy(-360,100).loop();
    game.rootScene.addChild(monkey);

    owl = new Sprite(100,100);
    owl.image = game.assets['owlResized100x100.png'];
    owl.x = (screen.width / 2) - (owl.width / 2);
    owl.y = (screen.height / 3) + (monkey.height / 3);
    owl.scaleX = 0.6;
    owl.scaleY = 0.6;
    owl.tl.rotateBy(360,100).loop();
    game.rootScene.addChild(owl);

    //TITLE LABEL TEXT 
    titleText = new MutableText((screen.width / 2) - (320 / 2),0,320);
    titleText.text = 'Identify the animals';
    titleText.backgroundColor = "blue";
    game.rootScene.addChild(titleText);
    },
    loadGame:function(){
        game.rootScene.removeChild(startLabel);
        game.rootScene.removeChild(clickStartText);
        game.rootScene.removeChild(titleText);
        game.rootScene.removeChild(cow);
        game.rootScene.removeChild(sheep);
        game.rootScene.removeChild(pig);
        game.rootScene.removeChild(monkey);
        game.rootScene.removeChild(owl);
        game.rootScene.removeChild(lion);
        game.popScene(startScene);
        firstScene = new FirstScene('cow2Resized100x100.png','elephant2Resized100x100.png','cow','cowSound.wav');
        game.pushScene(firstScene);
    }
});
//GAME ROOTSCENE  
game.onload = function(){
    startScene = new  StartScene();
};
    game.start();
};


FirstScene = Class.create(Scene,{
    initialize:function(img1,img2,animalName,animalSound){
        game.assets['ambienceFarmAnimals1.wav'].stop();
        //CREATES CORRECT LABEL
        correctLabel = new MutableText((screen.width / 2) - (224 / 2),50,224);
        correctLabel.text = "Yes!Well done!";
   
        correctLabel.backgroundColor = "green";
       
        rightAnimal = new Sprite(100,100);
        rightAnimal.image = game.assets[img1];
        rightAnimal.x = 30;
        rightAnimal.y = Math.floor(screen.height / 5);
        rightAnimal.scaleX = 1.3;
        rightAnimal.scaleY = 1.3;
        rightAnimal.addEventListener(Event.TOUCH_START,rightAnimalChoice)
        game.rootScene.addChild(rightAnimal);

        function rightAnimalChoice(){
            game.assets[animalSound].play();
            game.rootScene.addChild(correctLabel);
            rightAnimal.removeEventListener(Event.TOUCH_START,rightAnimalChoice);
            //REMOVES EVENT LISTENER FROM WRONG ANIMAL
            wrongAnimal.removeEventListener(Event.TOUCH_START,wrongAnimalSound);
            //REMOVES WRONG LABEL FROM SCREEN
            if(wrongLabel.age > 1){
                game.rootScene.removeChild(wrongLabel);
                game.assets['wrongChoiceCombo1.wav'].stop();
            } 

           setTimeout(function(){
                game.rootScene.removeChild(correctLabel);
                game.rootScene.removeChild(wrongLabel);
                game.rootScene.removeChild(questionLabel);
                game.rootScene.removeChild(rightAnimal);
                game.rootScene.removeChild(wrongAnimal);
                game.popScene(firstScene);
                secondScene = new SecondScene('duck2Resized100x100.png','lion2Resized100x100.png','duck','duckSound5sec.wav');
                game.pushScene(secondScene);
            },5000);
        }

        //CREATES WRONG LABEL
        wrongLabel = new MutableText((screen.width / 2) - (225 / 2),20,240);
        wrongLabel.text = "Oh no!Try again";
        wrongLabel.backgroundColor = "red";
       
        //CREATES WRONG ANIMAL
        wrongAnimal = new Sprite(100,100);
        wrongAnimal.image = game.assets[img2];
        wrongAnimal.x = screen.width - (wrongAnimal.width + 30);
        wrongAnimal.y = Math.floor(screen.height / 5);
        wrongAnimal.scaleX = 1.3;
        wrongAnimal.scaleY = 1.3;
        wrongAnimal.addEventListener(Event.TOUCH_START,wrongAnimalSound);
        game.rootScene.addChild(wrongAnimal);
        
        //FUNCTION TO REMOVE EVENT LISTENER FROM WRONG ANIMAL CHOICE
        function wrongAnimalSound(){
            game.assets['wrongChoiceCombo1.wav'].play();
            game.rootScene.addChild(wrongLabel);
            //REMOVES CORRECT LABEL LABEL FROM SCREEN
            if(correctLabel.age > 1){
                game.rootScene.removeChild(correctLabel);
                game.assets[animalSound].stop();
            } 
        }

        questionLabel = new MutableText(0,0,272);
        questionLabel.x = Math.floor(screen.width / 2) - Math.floor(questionLabel.width / 2);
        questionLabel.y = Math.floor(screen.height / 2);
        questionLabel.text = "Where is the " + animalName + "?";
        questionLabel.backgroundColor = "blue";
        game.rootScene.addChild(questionLabel);

        userInfo = new MutableText(0,0,320);
        userInfo.x = screen.width / 2 - 160;
        userInfo.y = screen.height / 1.7;
        userInfo.text = "Click correct choice";
        userInfo.backgroundColor = "orange";
        game.rootScene.addChild(userInfo);
    }
    
});

SecondScene = Class.create(Scene,{
    initialize:function(img1,img2,animalName,animalSound){
        
        //CREATES CORRECT LABEL
        correctLabel = new MutableText((screen.width / 2)- (225 / 2),50,224);
        correctLabel.text = "Yes!Well done!";
   
        correctLabel.backgroundColor = "green";
       
        rightAnimal = new Sprite(100,100);
        rightAnimal.image = game.assets[img1];
        rightAnimal.x = 30;
        rightAnimal.y = Math.floor(screen.height / 5);
        rightAnimal.scaleX = 1.3;
        rightAnimal.scaleY = 1.3;
        rightAnimal.addEventListener(Event.TOUCH_START,rightAnimalChoice)
        game.rootScene.addChild(rightAnimal);

        function rightAnimalChoice(){
            game.assets[animalSound].play();
            game.rootScene.addChild(correctLabel);
            rightAnimal.removeEventListener(Event.TOUCH_START,rightAnimalChoice);
            //REMOVES EVENT LISTENER FROM WRONG ANIMAL
            wrongAnimal.removeEventListener(Event.TOUCH_START,wrongAnimalSound);
            //REMOVES WRONG LABEL FROM SCREEN
            if(wrongLabel.age > 1){
                game.rootScene.removeChild(wrongLabel);
                game.assets['wrongChoiceCombo1.wav'].stop();
            } 

           setTimeout(function(){
                game.rootScene.removeChild(correctLabel);
                game.rootScene.removeChild(wrongLabel);
                game.rootScene.removeChild(questionLabel);
                game.rootScene.removeChild(rightAnimal);
                game.rootScene.removeChild(wrongAnimal);
                game.popScene(secondScene);
                thirdScene = new ThirdScene('elephant2Resized100x100.png','pigResized100x100.png','elephant','elephantSound.wav');
                game.pushScene(thirdScene);
            },5000);
        }

        //CREATES WRONG LABEL
        wrongLabel = new MutableText((screen.width / 2) - (225 / 2),20,240);
        wrongLabel.text = "Oh no!Try again";
        wrongLabel.backgroundColor = "red";
       
        //CREATES WRONG ANIMAL
        wrongAnimal = new Sprite(100,100);
        wrongAnimal.image = game.assets[img2];
        wrongAnimal.x = screen.width - (wrongAnimal.width + 30);
        wrongAnimal.y = Math.floor(screen.height / 5);
        wrongAnimal.scaleX = 1.3;
        wrongAnimal.scaleY = 1.3;
        wrongAnimal.addEventListener(Event.TOUCH_START,wrongAnimalSound)
        game.rootScene.addChild(wrongAnimal);
        
        function wrongAnimalSound(){
            game.assets['wrongChoiceCombo1.wav'].play();
            game.rootScene.addChild(wrongLabel);
            //REMOVES CORRECT LABEL LABEL FROM SCREEN
            if(correctLabel.age > 1){
                game.rootScene.removeChild(correctLabel);
                game.assets[animalSound].stop();
            } 
        }

        questionLabel = new MutableText(0,0,288);
        questionLabel.x = Math.floor(screen.width / 2) - Math.floor(questionLabel.width / 2);
        questionLabel.y = Math.floor(screen.height / 2);
        questionLabel.text = "Where is the " + animalName + "?";
        questionLabel.backgroundColor = "blue";
        game.rootScene.addChild(questionLabel);
    }
    
});

ThirdScene = Class.create(Scene,{
    initialize:function(img1,img2,animalName,animalSound){
        
        //CREATES CORRECT LABEL
        correctLabel = new MutableText((screen.width / 2) - (225 / 2),50,224);
        correctLabel.text = "Yes!Well done!";
   
        correctLabel.backgroundColor = "green";
       
        rightAnimal = new Sprite(100,100);
        rightAnimal.image = game.assets[img1];
        rightAnimal.x = 30;
        rightAnimal.y = Math.floor(screen.height / 5);
        rightAnimal.scaleX = 1.3;
        rightAnimal.scaleY = 1.3;
        rightAnimal.addEventListener(Event.TOUCH_START,rightAnimalChoice)
        game.rootScene.addChild(rightAnimal);

        function rightAnimalChoice(){
            game.assets[animalSound].play();
            game.rootScene.addChild(correctLabel);
            rightAnimal.removeEventListener(Event.TOUCH_START,rightAnimalChoice);
            //REMOVES EVENT LISTENER FROM WRONG ANIMAL
            wrongAnimal.removeEventListener(Event.TOUCH_START,wrongAnimalSound);
            //REMOVES WRONG LABEL FROM SCREEN
            if(wrongLabel.age > 1){
                game.rootScene.removeChild(wrongLabel);
                game.assets['wrongChoiceCombo1.wav'].stop();
            } 

           setTimeout(function(){
                game.rootScene.removeChild(correctLabel);
                game.rootScene.removeChild(wrongLabel);
                game.rootScene.removeChild(questionLabel);
                game.rootScene.removeChild(rightAnimal);
                game.rootScene.removeChild(wrongAnimal);
                game.rootScene.removeChild(userInfo);
                game.popScene(thirdScene);
                fourthScene = new FourthScene('owlResized100x100.png','pigResized100x100.png','owl','owlSound5sec.wav');
                game.pushScene(fourthScene);
            },5000);
        }
        //CREATES WRONG LABEL
        wrongLabel = new MutableText((screen.width / 2)- (225 / 2),20,240);
        wrongLabel.text = "Oh no!Try again";
        wrongLabel.backgroundColor = "red";
       
        //CREATES WRONG ANIMAL
        wrongAnimal = new Sprite(100,100);
        wrongAnimal.image = game.assets[img2];
        wrongAnimal.x = screen.width - (wrongAnimal.width + 30);
        wrongAnimal.y = Math.floor(screen.height / 5);
        wrongAnimal.scaleX = 1.4;
        wrongAnimal.scaleY = 1.4;
        wrongAnimal.addEventListener(Event.TOUCH_START,wrongAnimalSound)
        game.rootScene.addChild(wrongAnimal);
        
        function wrongAnimalSound(){
            game.assets['wrongChoiceCombo1.wav'].play();
            game.rootScene.addChild(wrongLabel);
            //REMOVES CORRECT LABEL LABEL FROM SCREEN
            if(correctLabel.age > 1){
                game.rootScene.removeChild(correctLabel);
                game.assets[animalSound].stop();
            } 
        }

        questionLabel = new MutableText(0,0,192);
        questionLabel.x = Math.floor(screen.width / 2) - Math.floor(questionLabel.width / 2);
        questionLabel.y = Math.floor(screen.height / 2);
        questionLabel.text = "Where is the " + animalName + "?";
        questionLabel.backgroundColor = "blue";
        game.rootScene.addChild(questionLabel);
    }
});

FourthScene = Class.create(Scene,{
    initialize:function(img1,img2,animalName,animalSound){
        
        //CREATES CORRECT LABEL
        correctLabel = new MutableText((screen.width / 2) - (225 / 2),50,224);
        correctLabel.text = "Yes!Well done!";
   
        correctLabel.backgroundColor = "green";
       
        rightAnimal = new Sprite(100,100);
        rightAnimal.image = game.assets[img1];
        rightAnimal.x = 30;
        rightAnimal.y = Math.floor(screen.height / 5);
        rightAnimal.scaleX = 1.3;
        rightAnimal.scaleY = 1.3;
        rightAnimal.addEventListener(Event.TOUCH_START,rightAnimalChoice);
        game.rootScene.addChild(rightAnimal);

        function rightAnimalChoice(){
            game.assets[animalSound].play();
            game.rootScene.addChild(correctLabel);
            rightAnimal.removeEventListener(Event.TOUCH_START,rightAnimalChoice);
            //REMOVES EVENT LISTENER FROM WRONG ANIMAL
            wrongAnimal.removeEventListener(Event.TOUCH_START,wrongAnimalSound);
            //REMOVES WRONG LABEL FROM SCREEN
            if(wrongLabel.age > 1){
                game.rootScene.removeChild(wrongLabel);
                game.assets['wrongChoiceCombo1.wav'].stop();
            } 

           setTimeout(function(){
                game.rootScene.removeChild(correctLabel);
                game.rootScene.removeChild(wrongLabel);
                game.rootScene.removeChild(questionLabel);
                game.rootScene.removeChild(rightAnimal);
                game.rootScene.removeChild(wrongAnimal);
                game.popScene(fourthScene);
                fifthScene = new FifthScene('pigResized100x100.png','lion2Resized100x100.png','lion','lionSound5sec.wav');
                game.pushScene(fifthScene);
            },5000);
        }
        //CREATES WRONG LABEL
        wrongLabel = new MutableText((screen.width / 2) - (225 / 2),20,240);
        wrongLabel.text = "Oh no!Try again";
        wrongLabel.backgroundColor = "red";
       
        //CREATES WRONG ANIMAL
        wrongAnimal = new Sprite(100,100);
        wrongAnimal.image = game.assets[img2];
        wrongAnimal.x = screen.width - (wrongAnimal.width + 30);
        wrongAnimal.y = Math.floor(screen.height / 5);
        wrongAnimal.scaleX = 1.4;
        wrongAnimal.scaleY = 1.4;
        wrongAnimal.addEventListener(Event.TOUCH_START,wrongAnimalSound)
        game.rootScene.addChild(wrongAnimal);
        
        function wrongAnimalSound(){
            game.assets['wrongChoiceCombo1.wav'].play();
            game.rootScene.addChild(wrongLabel);
            //REMOVES CORRECT LABEL LABEL FROM SCREEN
            if(correctLabel.age > 1){
                game.rootScene.removeChild(correctLabel);
                game.assets[animalSound].stop();
            } 
        }

        questionLabel = new MutableText(0,0,272);
        questionLabel.x = Math.floor(screen.width / 2) - Math.floor(questionLabel.width / 2);
        questionLabel.y = Math.floor(screen.height / 2);
        questionLabel.text = "Where is the " + animalName + "?";
        questionLabel.backgroundColor = "blue";
        game.rootScene.addChild(questionLabel);
    } 
});

//SWAPS THE RIGHT AND WRONG ANIMAL POSITIONS AROUND
FifthScene = Class.create(Scene,{
    initialize:function(img1,img2,animalName,animalSound){
        
        //CREATES WRONG LABEL
        wrongLabel = new MutableText((screen.width / 2) - (225 / 2),20,240);
        wrongLabel.text = "Oh no!Try again";
        wrongLabel.backgroundColor = "red";
        
        //CREATES WRONG ANIMAL
        wrongAnimal = new Sprite(100,100);
        wrongAnimal.image = game.assets[img2];
        wrongAnimal.x = screen.width - (wrongAnimal.width + 30);
        wrongAnimal.y = Math.floor(screen.height / 5);
        wrongAnimal.scaleX = 1.3;
        wrongAnimal.scaleY = 1.3;

        //CREATES CORRECT LABEL
        correctLabel = new MutableText((screen.width / 2) - (225 / 2),50,224);
        correctLabel.text = "Yes!Well done!";
        correctLabel.backgroundColor = "green";
       
        //CREATES RIGHT ANIMAL
        rightAnimal = new Sprite(100,100);
        rightAnimal.image = game.assets[img1];
        rightAnimal.x = 30;
        rightAnimal.y = Math.floor(screen.height / 5);
        rightAnimal.scaleX = 1.4;
        rightAnimal.scaleY = 1.4;
        wrongAnimal.addEventListener(Event.TOUCH_START,rightAnimalChoice)
        game.rootScene.addChild(rightAnimal);

        function rightAnimalChoice(){
            game.assets[animalSound].play();
            game.rootScene.addChild(correctLabel);
            rightAnimal.removeEventListener(Event.TOUCH_START,wrongAnimalSound);
            wrongAnimal.removeEventListener(Event.TOUCH_START,rightAnimalChoice)
            //REMOVES WRONG LABEL FROM SCREEN
            if(wrongLabel.age > 1){
                game.rootScene.removeChild(wrongLabel);
                game.assets['wrongChoiceCombo1.wav'].stop();
            } 

        setTimeout(function(){
                game.rootScene.removeChild(correctLabel);
                game.rootScene.removeChild(wrongLabel);
                game.rootScene.removeChild(questionLabel);
                game.rootScene.removeChild(rightAnimal);
                game.rootScene.removeChild(wrongAnimal);
                game.popScene(fifthScene);
                sixthScene = new SixthScene('bearResized100x100.png','duck2Resized100x100.png','bear','bearSound5seconds.wav');
                game.pushScene(sixthScene);
            },5000);
        }

        rightAnimal.addEventListener(Event.TOUCH_START,wrongAnimalSound)
        game.rootScene.addChild(wrongAnimal);
        
        function wrongAnimalSound(){
            game.assets['wrongChoiceCombo1.wav'].play();
            game.rootScene.addChild(wrongLabel);
            
            //REMOVES CORRECT LABEL LABEL FROM SCREEN
            if(correctLabel.age > 1){
                game.rootScene.removeChild(correctLabel);
                game.assets[animalSound].stop();
            }
        }

        questionLabel = new MutableText(0,0,288);
        questionLabel.x = Math.floor(screen.width / 2) - Math.floor(questionLabel.width / 2);
        questionLabel.y = Math.floor(screen.height / 2);
        questionLabel.text = "Where is the " + animalName + "?";
        questionLabel.backgroundColor = "blue";
        game.rootScene.addChild(questionLabel);
    } 
});

//SIXTH SCENE
SixthScene = Class.create(Scene,{
    initialize:function(img1,img2,animalName,animalSound){
        
        //CREATES CORRECT LABEL
        correctLabel = new MutableText((screen.width / 2) - (225 / 2),50,224);
        correctLabel.text = "Yes!Well done!";
   
        correctLabel.backgroundColor = "green";
       
        rightAnimal = new Sprite(100,100);
        rightAnimal.image = game.assets[img1];
        rightAnimal.x = 30;
        rightAnimal.y = Math.floor(screen.height / 5);
        rightAnimal.scaleX = 1.4;
        rightAnimal.scaleY = 1.4;
        rightAnimal.addEventListener(Event.TOUCH_START,rightAnimalChoice)
        game.rootScene.addChild(rightAnimal);

        function rightAnimalChoice(){
            game.assets[animalSound].play();
            game.rootScene.addChild(correctLabel);
            rightAnimal.removeEventListener(Event.TOUCH_START,rightAnimalChoice);
            //REMOVES EVENT LISTENER FROM WRONG ANIMAL
            wrongAnimal.removeEventListener(Event.TOUCH_START,wrongAnimalSound);
            //REMOVES WRONG LABEL FROM SCREEN
            if(wrongLabel.age > 1){
                game.rootScene.removeChild(wrongLabel);
                game.assets['wrongChoiceCombo1.wav'].stop();
            } 

           setTimeout(function(){
                game.rootScene.removeChild(correctLabel);
                game.rootScene.removeChild(wrongLabel);
                game.rootScene.removeChild(questionLabel);
                game.rootScene.removeChild(rightAnimal);
                game.rootScene.removeChild(wrongAnimal);
                game.popScene(sixthScene);
                seventhScene = new SeventhScene('owlResized100x100.png','monkeyResized100x100.png','monkey','monkeySound5sec.wav');
                game.pushScene(seventhScene);
            },5000);
        }
        //CREATES WRONG LABEL
        wrongLabel = new MutableText((screen.width / 2) - (225 / 2),20,240);
        wrongLabel.text = "Oh no!Try again";
        wrongLabel.backgroundColor = "red";
       
        //CREATES WRONG ANIMAL
        wrongAnimal = new Sprite(100,100);
        wrongAnimal.image = game.assets[img2];
        wrongAnimal.x = screen.width - (wrongAnimal.width + 30);
        wrongAnimal.y = Math.floor(screen.height / 5);
        wrongAnimal.scaleX = 1.3;
        wrongAnimal.scaleY = 1.3;
        wrongAnimal.addEventListener(Event.TOUCH_START,wrongAnimalSound)
        game.rootScene.addChild(wrongAnimal);
        
        function wrongAnimalSound(){
            game.assets['wrongChoiceCombo1.wav'].play();
            game.rootScene.addChild(wrongLabel);
            //REMOVES CORRECT LABEL LABEL FROM SCREEN
            if(correctLabel.age > 1){
                game.rootScene.removeChild(correctLabel);
                game.assets[animalSound].stop();
            } 
        }

        questionLabel = new MutableText(0,0,288);
        questionLabel.x = Math.floor(screen.width / 2) - Math.floor(questionLabel.width / 2);
        questionLabel.y = Math.floor(screen.height / 2);
        questionLabel.text = "Where is the " + animalName + "?";
        questionLabel.backgroundColor = "blue";
        game.rootScene.addChild(questionLabel);
    }
});

SeventhScene = Class.create(Scene,{
    initialize:function(img1,img2,animalName,animalSound){
        
        //CREATES WRONG LABEL
        wrongLabel = new MutableText((screen.width / 2) - (225 / 2),20,240);
        wrongLabel.text = "Oh no!Try again";
        wrongLabel.backgroundColor = "red";
        
        //CREATES WRONG ANIMAL
        wrongAnimal = new Sprite(100,100);
        wrongAnimal.image = game.assets[img2];
        wrongAnimal.x = screen.width - (wrongAnimal.width + 30);
        wrongAnimal.y = Math.floor(screen.height / 5);
        wrongAnimal.scaleX = 1.3;
        wrongAnimal.scaleY = 1.3;

        //CREATES CORRECT LABEL
        correctLabel = new MutableText((screen.width / 2) - (225 / 2),50,224);
        correctLabel.text = "Yes!Well done!";
        correctLabel.backgroundColor = "green";
       
        //CREATES RIGHT ANIMAL
        rightAnimal = new Sprite(100,100);
        rightAnimal.image = game.assets[img1];
        rightAnimal.x = 30;
        rightAnimal.y = Math.floor(screen.height / 5);
        rightAnimal.scaleX = 1.3;
        rightAnimal.scaleY = 1.3;
        wrongAnimal.addEventListener(Event.TOUCH_START,rightAnimalChoice)
        game.rootScene.addChild(rightAnimal);

        function rightAnimalChoice(){
            game.assets[animalSound].play();
            game.rootScene.addChild(correctLabel);
            rightAnimal.removeEventListener(Event.TOUCH_START,wrongAnimalSound);
            wrongAnimal.removeEventListener(Event.TOUCH_START,rightAnimalChoice)
            //REMOVES WRONG LABEL FROM SCREEN
            if(wrongLabel.age > 1){
                game.rootScene.removeChild(wrongLabel);
                game.assets['wrongChoiceCombo1.wav'].stop();
            } 

        setTimeout(function(){
                game.rootScene.removeChild(correctLabel);
                game.rootScene.removeChild(wrongLabel);
                game.rootScene.removeChild(questionLabel);
                game.rootScene.removeChild(rightAnimal);
                game.rootScene.removeChild(wrongAnimal);
                game.popScene(seventhScene);
                eigthScene = new EigthScene('bearResized100x100.png','pigResized100x100.png','pig','pigSound5sec.wav');
                game.pushScene(eigthScene);
            },5000);
        }

        rightAnimal.addEventListener(Event.TOUCH_START,wrongAnimalSound)
        game.rootScene.addChild(wrongAnimal);
        
        function wrongAnimalSound(){
            game.assets['wrongChoiceCombo1.wav'].play();
            game.rootScene.addChild(wrongLabel);
            
            //REMOVES CORRECT LABEL LABEL FROM SCREEN
            if(correctLabel.age > 1){
                game.rootScene.removeChild(correctLabel);
                game.assets[animalSound].stop();
            }
        }

        questionLabel = new MutableText(0,0,320);
        questionLabel.x = Math.floor(screen.width / 2) - Math.floor(questionLabel.width / 2);
        questionLabel.y = Math.floor(screen.height / 2);
        questionLabel.text = "Where is the " + animalName + "?";
        questionLabel.backgroundColor = "blue";
        game.rootScene.addChild(questionLabel);
    } 
});

EigthScene = Class.create(Scene,{
    initialize:function(img1,img2,animalName,animalSound){
        
        //CREATES WRONG LABEL
        wrongLabel = new MutableText((screen.width / 2) - (225 / 2),20,240);
        wrongLabel.text = "Oh no!Try again";
        wrongLabel.backgroundColor = "red";
        
        //CREATES WRONG ANIMAL
        wrongAnimal = new Sprite(100,100);
        wrongAnimal.image = game.assets[img2];
        wrongAnimal.x = screen.width - (wrongAnimal.width + 30);
        wrongAnimal.y = Math.floor(screen.height / 5);
        wrongAnimal.scaleX = 1.4;
        wrongAnimal.scaleY = 1.4;

        //CREATES CORRECT LABEL
        correctLabel = new MutableText((screen.width / 2) - (225 / 2),50,224);
        correctLabel.text = "Yes!Well done!";
        correctLabel.backgroundColor = "green";
       
        //CREATES RIGHT ANIMAL
        rightAnimal = new Sprite(100,100);
        rightAnimal.image = game.assets[img1];
        rightAnimal.x = 30;
        rightAnimal.y = Math.floor(screen.height / 5);
        rightAnimal.scaleX = 1.3;
        rightAnimal.scaleY = 1.3;
        wrongAnimal.addEventListener(Event.TOUCH_START,rightAnimalChoice)
        game.rootScene.addChild(rightAnimal);

        function rightAnimalChoice(){
            game.assets[animalSound].play();
            game.rootScene.addChild(correctLabel);
            rightAnimal.removeEventListener(Event.TOUCH_START,wrongAnimalSound);
            wrongAnimal.removeEventListener(Event.TOUCH_START,rightAnimalChoice)
            //REMOVES WRONG LABEL FROM SCREEN
            if(wrongLabel.age > 1){
                game.rootScene.removeChild(wrongLabel);
                game.assets['wrongChoiceCombo1.wav'].stop();
            } 

        setTimeout(function(){
                game.rootScene.removeChild(correctLabel);
                game.rootScene.removeChild(wrongLabel);
                game.rootScene.removeChild(questionLabel);
                game.rootScene.removeChild(rightAnimal);
                game.rootScene.removeChild(wrongAnimal);
                game.popScene(eigthScene);
                ninthScene = new NinthScene('monkeyResized100x100.png','goatResized100x100.png','goat','goatSound.wav');
                game.pushScene(ninthScene);
            },5000);
        }

        rightAnimal.addEventListener(Event.TOUCH_START,wrongAnimalSound)
        game.rootScene.addChild(wrongAnimal);
        
        function wrongAnimalSound(){
            game.assets['wrongChoiceCombo1.wav'].play();
            game.rootScene.addChild(wrongLabel);
            
            //REMOVES CORRECT LABEL LABEL FROM SCREEN
            if(correctLabel.age > 1){
                game.rootScene.removeChild(correctLabel);
                game.assets[animalSound].stop();
            }
        }

        questionLabel = new MutableText(0,0,272);
        questionLabel.x = Math.floor(screen.width / 2) - Math.floor(questionLabel.width / 2);
        questionLabel.y = Math.floor(screen.height / 2);
        questionLabel.text = "Where is the " + animalName + "?";
        questionLabel.backgroundColor = "blue";
        game.rootScene.addChild(questionLabel);
    } 
});

//NINTH SCENE
NinthScene = Class.create(Scene,{
    initialize:function(img1,img2,animalName,animalSound){
        
        //CREATES WRONG LABEL
        wrongLabel = new MutableText((screen.width / 2) - (225 / 2),20,240);
        wrongLabel.text = "Oh no!Try again";
        wrongLabel.backgroundColor = "red";
        
        //CREATES WRONG ANIMAL
        wrongAnimal = new Sprite(100,100);
        wrongAnimal.image = game.assets[img2];
        wrongAnimal.x = screen.width - (wrongAnimal.width + 30);
        wrongAnimal.y = Math.floor(screen.height / 5);
        wrongAnimal.scaleX = 1.4;
        wrongAnimal.scaleY = 1.4;

        //CREATES CORRECT LABEL
        correctLabel = new MutableText((screen.width / 2) - (225 / 2),50,224);
        correctLabel.text = "Yes!Well done!";
        correctLabel.backgroundColor = "green";
       
        //CREATES RIGHT ANIMAL
        rightAnimal = new Sprite(100,100);
        rightAnimal.image = game.assets[img1];
        rightAnimal.x = 30;
        rightAnimal.y = Math.floor(screen.height / 5);
        rightAnimal.scaleX = 1.3;
        rightAnimal.scaleY = 1.3;
        wrongAnimal.addEventListener(Event.TOUCH_START,rightAnimalChoice)
        game.rootScene.addChild(rightAnimal);

        function rightAnimalChoice(){
            game.assets[animalSound].play();
            game.rootScene.addChild(correctLabel);
            rightAnimal.removeEventListener(Event.TOUCH_START,wrongAnimalSound);
            wrongAnimal.removeEventListener(Event.TOUCH_START,rightAnimalChoice)
            //REMOVES WRONG LABEL FROM SCREEN
            if(wrongLabel.age > 1){
                game.rootScene.removeChild(wrongLabel);
                game.assets['wrongChoiceCombo1.wav'].stop();
            } 

        setTimeout(function(){
                game.rootScene.removeChild(correctLabel);
                game.rootScene.removeChild(wrongLabel);
                game.rootScene.removeChild(questionLabel);
                game.rootScene.removeChild(rightAnimal);
                game.rootScene.removeChild(wrongAnimal);
                game.popScene(ninthScene);
                tenthScene = new TenthScene('sheepResized100x100.png','owlResized100x100.png','sheep','sheepSound5sec.wav');
                game.pushScene(tenthScene);
            },5000);
        }

        rightAnimal.addEventListener(Event.TOUCH_START,wrongAnimalSound)
        game.rootScene.addChild(wrongAnimal);
        
        function wrongAnimalSound(){
            game.assets['wrongChoiceCombo1.wav'].play();
            game.rootScene.addChild(wrongLabel);
            
            //REMOVES CORRECT LABEL LABEL FROM SCREEN
            if(correctLabel.age > 1){
                game.rootScene.removeChild(correctLabel);
                game.assets[animalSound].stop();
            }
        }

        questionLabel = new MutableText(0,0,288);
        questionLabel.x = Math.floor(screen.width / 2) - Math.floor(questionLabel.width / 2);
        questionLabel.y = Math.floor(screen.height / 2);
        questionLabel.text = "Where is the " + animalName + "?";
        questionLabel.backgroundColor = "blue";
        game.rootScene.addChild(questionLabel);
    } 
});

TenthScene = Class.create(Scene,{
    initialize:function(img1,img2,animalName,animalSound){
        
        //CREATES CORRECT LABEL
        correctLabel = new MutableText((screen.width / 2) - (225 / 2),50,224);
        correctLabel.text = "Yes!Well done!";
   
        correctLabel.backgroundColor = "green";
       
        rightAnimal = new Sprite(100,100);
        rightAnimal.image = game.assets[img1];
        rightAnimal.x = 30;
        rightAnimal.y = Math.floor(screen.height / 5);
        rightAnimal.scaleX = 1.3;
        rightAnimal.scaleY = 1.3;
        rightAnimal.addEventListener(Event.TOUCH_START,rightAnimalChoice);
        game.rootScene.addChild(rightAnimal);

        function rightAnimalChoice(){
            game.assets[animalSound].play();
            game.rootScene.addChild(correctLabel);
            rightAnimal.removeEventListener(Event.TOUCH_START,rightAnimalChoice);
            //REMOVES EVENT LISTENER FROM WRONG ANIMAL
            wrongAnimal.removeEventListener(Event.TOUCH_START,wrongAnimalSound);
            //REMOVES WRONG LABEL FROM SCREEN
            if(wrongLabel.age > 1){
                game.rootScene.removeChild(wrongLabel);
                game.assets['wrongChoiceCombo1.wav'].stop();
            } 

           setTimeout(function(){
                game.rootScene.removeChild(correctLabel);
                game.rootScene.removeChild(wrongLabel);
                game.rootScene.removeChild(questionLabel);
                game.rootScene.removeChild(rightAnimal);
                game.rootScene.removeChild(wrongAnimal);
                game.popScene(tenthScene);
                eleventhScene = new EleventhScene('rooster2Resized100x100.png','horse2Resized100x100.png','horse','horseSound.wav');
                game.pushScene(eleventhScene);
            },5000);
        }
        //CREATES WRONG LABEL
        wrongLabel = new MutableText((screen.width / 2) - (225 / 2),20,240);
        wrongLabel.text = "Oh no!Try again";
        wrongLabel.backgroundColor = "red";
       
        //CREATES WRONG ANIMAL
        wrongAnimal = new Sprite(100,100);
        wrongAnimal.image = game.assets[img2];
        wrongAnimal.x = screen.width - (wrongAnimal.width + 30);
        wrongAnimal.y = Math.floor(screen.height / 5);
        wrongAnimal.scaleX = 1.4;
        wrongAnimal.scaleY = 1.4;
        wrongAnimal.addEventListener(Event.TOUCH_START,wrongAnimalSound)
        game.rootScene.addChild(wrongAnimal);
        
        function wrongAnimalSound(){
            game.assets['wrongChoiceCombo1.wav'].play();
            game.rootScene.addChild(wrongLabel);
            //REMOVES CORRECT LABEL LABEL FROM SCREEN
            if(correctLabel.age > 1){
                game.rootScene.removeChild(correctLabel);
                game.assets[animalSound].stop();
            } 
        }

        questionLabel = new MutableText(0,0,304);
        questionLabel.x = Math.floor(screen.width / 2) - Math.floor(questionLabel.width / 2);
        questionLabel.y = Math.floor(screen.height / 2);
        questionLabel.text = "Where is the " + animalName + "?";
        questionLabel.backgroundColor = "blue";
        game.rootScene.addChild(questionLabel);
    } 
});

//SWAPS THE RIGHT AND WRONG ANIMAL POSITIONS AROUND
EleventhScene = Class.create(Scene,{
    initialize:function(img1,img2,animalName,animalSound){
        
        //CREATES WRONG LABEL
        wrongLabel = new MutableText((screen.width / 2) - (225 / 2),20,240);
        wrongLabel.text = "Oh no!Try again";
        wrongLabel.backgroundColor = "red";
        
        //CREATES WRONG ANIMAL
        wrongAnimal = new Sprite(100,100);
        wrongAnimal.image = game.assets[img2];
        wrongAnimal.x = screen.width - (wrongAnimal.width + 30);
        wrongAnimal.y = Math.floor(screen.height / 5);
        wrongAnimal.scaleX = 1.3;
        wrongAnimal.scaleY = 1.3;

        //CREATES CORRECT LABEL
        correctLabel = new MutableText((screen.width / 2) - (225 / 2),50,224);
        correctLabel.text = "Yes!Well done!";
        correctLabel.backgroundColor = "green";
       
        //CREATES RIGHT ANIMAL
        rightAnimal = new Sprite(100,100);
        rightAnimal.image = game.assets[img1];
        rightAnimal.x = 30;
        rightAnimal.y = Math.floor(screen.height / 5);
        rightAnimal.scaleX = 1.4;
        rightAnimal.scaleY = 1.4;
        wrongAnimal.addEventListener(Event.TOUCH_START,rightAnimalChoice)
        game.rootScene.addChild(rightAnimal);

        function rightAnimalChoice(){
            game.assets[animalSound].play();
            game.rootScene.addChild(correctLabel);
            rightAnimal.removeEventListener(Event.TOUCH_START,wrongAnimalSound);
            wrongAnimal.removeEventListener(Event.TOUCH_START,rightAnimalChoice)
            //REMOVES WRONG LABEL FROM SCREEN
            if(wrongLabel.age > 1){
                game.rootScene.removeChild(wrongLabel);
                game.assets['wrongChoiceCombo1.wav'].stop();
            } 

        setTimeout(function(){
                game.rootScene.removeChild(correctLabel);
                game.rootScene.removeChild(wrongLabel);
                game.rootScene.removeChild(questionLabel);
                game.rootScene.removeChild(rightAnimal);
                game.rootScene.removeChild(wrongAnimal);
                game.popScene(eleventhScene);
                twelfthScene = new TwelfthScene('goatResized100x100.png','rooster2Resized100x100.png','rooster','roosterSound5sec.wav');
                game.pushScene(twelfthScene);
            },5000);
        }

        rightAnimal.addEventListener(Event.TOUCH_START,wrongAnimalSound)
        game.rootScene.addChild(wrongAnimal);
        
        function wrongAnimalSound(){
            game.assets['wrongChoiceCombo1.wav'].play();
            game.rootScene.addChild(wrongLabel);
            
            //REMOVES CORRECT LABEL LABEL FROM SCREEN
            if(correctLabel.age > 1){
                game.rootScene.removeChild(correctLabel);
                game.assets[animalSound].stop();
            }
        }

        questionLabel = new MutableText(0,0,304);
        questionLabel.x = Math.floor(screen.width / 2) - Math.floor(questionLabel.width / 2);
        questionLabel.y = Math.floor(screen.height / 2);
        questionLabel.text = "Where is the " + animalName + "?";
        questionLabel.backgroundColor = "blue";
        game.rootScene.addChild(questionLabel);
    } 
});

//SWAPS THE RIGHT AND WRONG ANIMAL POSITIONS AROUND
TwelfthScene = Class.create(Scene,{
    initialize:function(img1,img2,animalName,animalSound){
        
        //CREATES WRONG LABEL
        wrongLabel = new MutableText((screen.width / 2) - (225 / 2),20,240);
        wrongLabel.text = "Oh no!Try again";
        wrongLabel.backgroundColor = "red";
        
        //CREATES WRONG ANIMAL
        wrongAnimal = new Sprite(100,100);
        wrongAnimal.image = game.assets[img2];
        wrongAnimal.x = screen.width - (wrongAnimal.width + 30);
        wrongAnimal.y = Math.floor(screen.height / 5);
        wrongAnimal.scaleX = 1.4;
        wrongAnimal.scaleY = 1.4;

        //CREATES CORRECT LABEL
        correctLabel = new MutableText((screen.width / 2) - (225 / 2),50,224);
        correctLabel.text = "Yes!Well done!";
        correctLabel.backgroundColor = "green";
       
        //CREATES RIGHT ANIMAL
        rightAnimal = new Sprite(100,100);
        rightAnimal.image = game.assets[img1];
        rightAnimal.x = 30;
        rightAnimal.y = Math.floor(screen.height / 5);
        rightAnimal.scaleX = 1.4;
        rightAnimal.scaleY = 1.4;
        wrongAnimal.addEventListener(Event.TOUCH_START,rightAnimalChoice)
        game.rootScene.addChild(rightAnimal);

        function rightAnimalChoice(){
            game.assets[animalSound].play();
            game.rootScene.addChild(correctLabel);
            rightAnimal.removeEventListener(Event.TOUCH_START,wrongAnimalSound);
            wrongAnimal.removeEventListener(Event.TOUCH_START,rightAnimalChoice)
            //REMOVES WRONG LABEL FROM SCREEN
            if(wrongLabel.age > 1){
                game.rootScene.removeChild(wrongLabel);
                game.assets['wrongChoiceCombo1.wav'].stop();
            } 

        setTimeout(function(){
                game.rootScene.removeChild(correctLabel);
                game.rootScene.removeChild(wrongLabel);
                game.rootScene.removeChild(questionLabel);
                game.rootScene.removeChild(rightAnimal);
                game.rootScene.removeChild(wrongAnimal);
                game.popScene(twelfthScene);
                thirteenthScene = new ThirteenthScene('rooster2Resized100x100.png','catResized100x100.png','cat','catSound5sec.wav');
                game.pushScene(thirteenthScene);
            },5000);
        }

        rightAnimal.addEventListener(Event.TOUCH_START,wrongAnimalSound)
        game.rootScene.addChild(wrongAnimal);
        
        function wrongAnimalSound(){
            game.assets['wrongChoiceCombo1.wav'].play();
            game.rootScene.addChild(wrongLabel);
            
            //REMOVES CORRECT LABEL LABEL FROM SCREEN
            if(correctLabel.age > 1){
                game.rootScene.removeChild(correctLabel);
                game.assets[animalSound].stop();
            }
        }

        questionLabel = new MutableText(0,0,192);
        questionLabel.x = Math.floor(screen.width / 2) - Math.floor(questionLabel.width / 2);
        questionLabel.y = Math.floor(screen.height / 2);
        questionLabel.text = "Where is the " + animalName + "?";
        questionLabel.backgroundColor = "blue";
        game.rootScene.addChild(questionLabel);
    } 
});

ThirteenthScene = Class.create(Scene,{
    initialize:function(img1,img2,animalName,animalSound){
        
        //CREATES WRONG LABEL
        wrongLabel = new MutableText((screen.width / 2) - (225 / 2),20,240);
        wrongLabel.text = "Oh no!Try again";
        wrongLabel.backgroundColor = "red";
        
        //CREATES WRONG ANIMAL
        wrongAnimal = new Sprite(100,100);
        wrongAnimal.image = game.assets[img2];
        wrongAnimal.x = screen.width - (wrongAnimal.width + 30);
        wrongAnimal.y = Math.floor(screen.height / 5);
        wrongAnimal.scaleX = 1.4;
        wrongAnimal.scaleY = 1.4;

        //CREATES CORRECT LABEL
        correctLabel = new MutableText((screen.width / 2) - (225 / 2),50,224);
        correctLabel.text = "Yes!Well done!";
        correctLabel.backgroundColor = "green";
       
        //CREATES RIGHT ANIMAL
        rightAnimal = new Sprite(100,100);
        rightAnimal.image = game.assets[img1];
        rightAnimal.x = 30;
        rightAnimal.y = Math.floor(screen.height / 5);
        rightAnimal.scaleX = 1.3;
        rightAnimal.scaleY = 1.3;
        wrongAnimal.addEventListener(Event.TOUCH_START,rightAnimalChoice)
        game.rootScene.addChild(rightAnimal);

        function rightAnimalChoice(){
            game.assets[animalSound].play();
            game.rootScene.addChild(correctLabel);
            rightAnimal.removeEventListener(Event.TOUCH_START,wrongAnimalSound);
            wrongAnimal.removeEventListener(Event.TOUCH_START,rightAnimalChoice)
            //REMOVES WRONG LABEL FROM SCREEN
            if(wrongLabel.age > 1){
                game.rootScene.removeChild(wrongLabel);
                game.assets['wrongChoiceCombo1.wav'].stop();
            } 

        setTimeout(function(){
                game.rootScene.removeChild(correctLabel);
                game.rootScene.removeChild(wrongLabel);
                game.rootScene.removeChild(questionLabel);
                game.rootScene.removeChild(rightAnimal);
                game.rootScene.removeChild(wrongAnimal);
                game.popScene(thirteenthScene);
                fourteenthScene = new FourteenthScene('lion2Resized100x100.png','tigerResized100x100.png','tiger','tigerSound5sec.wav');
                game.pushScene(fourteenthScene);
            },5000);
        }

        rightAnimal.addEventListener(Event.TOUCH_START,wrongAnimalSound)
        game.rootScene.addChild(wrongAnimal);
        
        function wrongAnimalSound(){
            game.assets['wrongChoiceCombo1.wav'].play();
            game.rootScene.addChild(wrongLabel);
            
            //REMOVES CORRECT LABEL LABEL FROM SCREEN
            if(correctLabel.age > 1){
                game.rootScene.removeChild(correctLabel);
                game.assets[animalSound].stop();
            }
        }

        questionLabel = new MutableText(0,0,272);
        questionLabel.x = Math.floor(screen.width / 2) - Math.floor(questionLabel.width / 2);
        questionLabel.y = Math.floor(screen.height / 2);
        questionLabel.text = "Where is the " + animalName + "?";
        questionLabel.backgroundColor = "blue";
        game.rootScene.addChild(questionLabel);
    } 
});

FourteenthScene = Class.create(Scene,{
    initialize:function(img1,img2,animalName,animalSound){
        
        //CREATES WRONG LABEL
        wrongLabel = new MutableText((screen.width / 2) - (225 / 2),20,240);
        wrongLabel.text = "Oh no!Try again";
        wrongLabel.backgroundColor = "red";
        
        //CREATES WRONG ANIMAL
        wrongAnimal = new Sprite(100,100);
        wrongAnimal.image = game.assets[img2];
        wrongAnimal.x = screen.width - (wrongAnimal.width + 30);
        wrongAnimal.y = Math.floor(screen.height / 5);
        wrongAnimal.scaleX = 1.4;
        wrongAnimal.scaleY = 1.4;

        //CREATES CORRECT LABEL
        correctLabel = new MutableText((screen.width / 2) - (225 / 2),50,224);
        correctLabel.text = "Yes!Well done!";
        correctLabel.backgroundColor = "green";
       
        //CREATES RIGHT ANIMAL
        rightAnimal = new Sprite(100,100);
        rightAnimal.image = game.assets[img1];
        rightAnimal.x = 30;
        rightAnimal.y = Math.floor(screen.height / 5);
        rightAnimal.scaleX = 1.3;
        rightAnimal.scaleY = 1.3;
        wrongAnimal.addEventListener(Event.TOUCH_START,rightAnimalChoice)
        game.rootScene.addChild(rightAnimal);

        function rightAnimalChoice(){
            game.assets[animalSound].play();
            game.rootScene.addChild(correctLabel);
            rightAnimal.removeEventListener(Event.TOUCH_START,wrongAnimalSound);
            wrongAnimal.removeEventListener(Event.TOUCH_START,rightAnimalChoice)
            //REMOVES WRONG LABEL FROM SCREEN
            if(wrongLabel.age > 1){
                game.rootScene.removeChild(wrongLabel);
                game.assets['wrongChoiceCombo1.wav'].stop();
            } 

        setTimeout(function(){
                game.rootScene.removeChild(correctLabel);
                game.rootScene.removeChild(wrongLabel);
                game.rootScene.removeChild(questionLabel);
                game.rootScene.removeChild(rightAnimal);
                game.rootScene.removeChild(wrongAnimal);
                game.popScene(fourteenthScene);
                endScene = new EndScene();
                game.pushScene(endScene);
            },5000);
        }

        rightAnimal.addEventListener(Event.TOUCH_START,wrongAnimalSound)
        game.rootScene.addChild(wrongAnimal);
        
        function wrongAnimalSound(){
            game.assets['wrongChoiceCombo1.wav'].play();
            game.rootScene.addChild(wrongLabel);
            
            //REMOVES CORRECT LABEL LABEL FROM SCREEN
            if(correctLabel.age > 1){
                game.rootScene.removeChild(correctLabel);
                game.assets[animalSound].stop();
            }
        }

        questionLabel = new MutableText(0,0,304);
        questionLabel.x = Math.floor(screen.width / 2) - Math.floor(questionLabel.width / 2);
        questionLabel.y = Math.floor(screen.height / 2);
        questionLabel.text = "Where is the " + animalName + "?";
        questionLabel.backgroundColor = "blue";
        game.rootScene.addChild(questionLabel);
    } 
});

EndScene = Class.create(Scene,{
    
    initialize:function(){
        game.assets['ambienceFarmAnimals1.wav'].play();

        //TITLE LABEL TEXT 
        titleText1 = new MutableText((screen.width / 2) - (304 / 2),0,304);
        titleText1.text = 'Thanks for playing!';
        titleText1.backgroundColor = "blue";
        game.rootScene.addChild(titleText1);
        //START IMAGE WITH EVENTLISTENER TO START GAME
        gameoverLabel = new Sprite(189,97);
        gameoverLabel.image = game.assets['gameover.png'];
        gameoverLabel.x = (screen.width / 2) - (gameoverLabel.width / 2);
        gameoverLabel.y = screen.height / 4;
        game.rootScene.addChild(gameoverLabel);
        gameoverLabel.addEventListener(Event.TOUCH_START,this.loadGame);
 
        //CLICK START TEXT LABEL 
        clickGameoverText = new MutableText(0,0,256);
        clickGameoverText.x = (screen.width / 2) - (clickGameoverText.width / 2);
        clickGameoverText.y = screen.height / 1.5;
        clickGameoverText.text = 'click GAME OVER.';
        clickGameoverText.backgroundColor = "black";
        game.rootScene.addChild(clickGameoverText);

        cow1 = new Sprite(100,100);
        cow1.image = game.assets['cow2Resized100x100.png'];
        cow1.x = 0;
        cow1.y = 30;
        cow1.scaleX = 0.6;
        cow1.scaleY = 0.6;
        cow1.tl.rotateBy(-360,100).loop();
        game.rootScene.addChild(cow1);

        pig1 = new Sprite(100,100);
        pig1.image = game.assets['pigResized100x100.png'];
        pig1.x = screen.width - pig1.width;
        pig1.y = 30;
        pig1.scaleX = 0.6;
        pig1.scaleY = 0.6;
        pig1.tl.rotateBy(360,100).loop();
        game.rootScene.addChild(pig1);

        sheep1 = new Sprite(100,100);
        sheep1.image = game.assets['sheepResized100x100.png'];
        sheep1.x = (screen.width / 2) - (sheep1.width / 2);
        sheep1.y = 30;
        sheep1.scaleX = 0.6;
        sheep1.scaleY = 0.6;
        sheep1.tl.rotateBy(-360,100).loop();
        game.rootScene.addChild(sheep1);

        lion1 = new Sprite(100,100);
        lion1.image = game.assets['lion2Resized100x100.png'];
        lion1.x = 0;
        lion1.y = (screen.height / 3) + (lion1.height / 2);
        lion1.scaleX = 0.6;
        lion1.scaleY = 0.6;
        lion1.tl.rotateBy(360,100).loop();
        game.rootScene.addChild(lion1);

        monkey1 = new Sprite(100,100);
        monkey1.image = game.assets['monkeyResized100x100.png'];
        monkey1.x = screen.width - pig.width;
        monkey1.y = (screen.height / 3) + (monkey1.height / 2);
        monkey1.scaleX = 0.6;
        monkey1.scaleY = 0.6;
        monkey1.tl.rotateBy(-360,100).loop();
        game.rootScene.addChild(monkey1);

        owl1 = new Sprite(100,100);
        owl1.image = game.assets['owlResized100x100.png'];
        owl1.x = (screen.width / 2) - (owl1.width / 2);
        owl1.y = (screen.height / 3) + (monkey1.height / 2);
        owl1.scaleX = 0.6;
        owl1.scaleY = 0.6;
        owl1.tl.rotateBy(360,100).loop();
        game.rootScene.addChild(owl1);

       },
       loadGame:function(){
           game.rootScene.removeChild(gameoverLabel);
           game.rootScene.removeChild(clickGameoverText);
           game.rootScene.removeChild(titleText1);
           game.rootScene.removeChild(cow1);
           game.rootScene.removeChild(sheep1);
           game.rootScene.removeChild(pig1);
           game.rootScene.removeChild(monkey1);
           game.rootScene.removeChild(owl1);
           game.rootScene.removeChild(lion1);
           game.popScene(endScene);
           firstScene = new FirstScene('cow2Resized100x100.png','elephant2Resized100x100.png','cow','cowSound.wav');
           game.pushScene(firstScene);
       }
});