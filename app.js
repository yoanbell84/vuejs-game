new Vue({
    el:'#app',
    data:{
        playerHealth: 100,
        monsterHealth:100,
        gameIsRunning : false,
        turns:[]
        
    },
    methods: {
        startGame: function(){ 
            this.gameIsRunning = true;
            this.monsterHealth = 100;
            this.playerHealth =100;
            this.turns = [];
        },
        attack: function(){
            var damage = this.calculateDamage(3,10);
            this.monsterHealth-= damage;
            this.turns.unshift({
                isPlayer: true,
                msg:"Player hits monster "+damage+" of damage"
            });
            if(this.checkWin()){
                return;
            }
            
            this.monsterAttacks();
        },
        specialAttack: function(){
            var damage = this.calculateDamage(3,10);
            this.monsterHealth-= damage;
            this.turns.unshift({
                isPlayer: true,
                msg:"Player hits monster hard "+damage+" of damage"
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },
        heal: function(){   
            if(this.playerHealth <= 90){
                this.playerHealth+=10;
            }else{
                this.playerHealth=100;
            }       
            this.turns.unshift({
                isPlayer: true,
                msg:"Player heals for 10"
            });
             this.monsterAttacks();
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },
        calculateDamage: function(min,max){
           return Math.max(Math.floor(Math.random() * max) + 1 , min );
        },
        monsterAttacks: function(){
            var damage = this.calculateDamage(5,12);
            this.playerHealth-= damage;
            this.turns.unshift({
                isPlayer: false,
                msg:"Monster hits player "+damage+" of damage"
            })
            this.checkWin();
        },
        checkWin:function(){

            if(this.monsterHealth <=0){
                if(confirm("You won! start new Game?")){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }             
                return true;
            }else if(this.playerHealth <=0){
                if(confirm("You lost! start new Game?")){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }             
                return true;
            }
            return false;
        }
    }
});