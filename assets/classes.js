class Charater{

    _life = 1;
    maxlife = 1;
    attack = 0;
    defense = 0;

    constructor(name){
        this.name = name;
    }

    get life (){
        return this._life;
    }

    set life(newLife){
        this._life = newLife < 0 ? 0: newLife;
    }
}

class Knight extends Charater{
    constructor(name){
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxlife = this.life;
    }
}

class Socerer extends Charater{
    constructor(name){
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 4;
        this.maxlife = this.life;
    }
}

class LittleMonster extends Charater{
    constructor(){
        super('Little Monster');
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxlife = this.life;
    }
}

class BigBoss extends Charater{
    constructor(){
        super('Big Boss');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxlife = this.life;

    }
}

class Stage{
    constructor(fighter1, fighter2, fighterEL1, fighterEL2, logObject){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighterEL1 = fighterEL1;
        this.fighterEL2 = fighterEL2;   
        this.log = logObject;    
    }

    star(){
        this.update ();
        
        this.fighterEL1.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2) )
        this.fighterEL2.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1) )
    }

    update(){
        //fighter1 
        this.fighterEL1.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let pct1 = (this.fighter1.life/this.fighter1.maxlife) * 100;
        this.fighterEL1.querySelector('.bar').style.width = `${pct1}%`;

        //fighter2
        this.fighterEL2.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let pct2 = (this.fighter2.life/this.fighter2.maxlife) * 100;
        this.fighterEL2.querySelector('.bar').style.width = `${pct2}%`;
    }

    doAttack(attacking, attacked){
        if(attacking.life <= 0 || attacked.life <= 0){
            this.log.addMessage('personagem morto');
            return;
        }

        let attackFactor = (Math.random()*2 ).toFixed(2);
        let defenseFactor = (Math.random()*2).toFixed(2);

        
        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense){
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(1)} de dano em ${attacked.name}`);
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender...`);
        }
        this.update();
    }
}

class Log{
    list = [];

    constructor(listEl){
        this.listEl = listEl;
    }

    addMessage(msg){
        this.list.push(msg);
        this.render();
    }

    render(){
        this.listEl.innerHTML = '';

        for(let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}