const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let salesObjects=[];
let obstacles = [];
let powerUps = [];
let drops = [];
let portals = [];
let powerUpSpawnInterval = 5000; // 5000ms = 5 segundos
let gameState = "notStarted"; // Posibles estados: "running" y "gameOver"
let spacePressed = false;
let noEnemies=false;
let level=1;
let killed=0;
let playerdamage=1;
let intro=0;
let generated=false;;
let specialActivated=false;
let levelend=false;
let selectedPlayer=1;
let levelMonsters= Math.random()*level +10;

  let spriteWidth = 157; // Ancho de cada frame del sprite
		  let spriteHeight = 203; 
		  let frameCount = 3;
		  let currentFrame = 0;
		  let ticks = 0;
  let spriteEWidth = 128; // Ancho de cada frame del sprite
		  let spriteEHeight = 144; 
		  
		  let ticksE = 0;
const playerImageU = new Image();
playerImageU.src = "question.png";

const playerAvatar = new Image();
playerAvatar.src = "francis.png";

const playerImage = new Image();
playerImage.src = "animationfrancis.png";

const playerAvatar2 = new Image();
playerAvatar2.src = "flamingo.png";

const playerAvatar3 = new Image();
playerAvatar3.src = "yoda.png";

const playerAvatar4 = new Image();
playerAvatar4.src = "andres.png";

const playerAvatar5 = new Image();
playerAvatar5.src = "ivan.png";

const playerAvatar6 = new Image();
playerAvatar6.src = "fernando.png";

const playerAvatar7 = new Image();
playerAvatar7.src = "karolina.png";

const playerAvatar8 = new Image();
playerAvatar8.src = "nadeem.png";

const playerImage2 = new Image();
playerImage2.src = "animationflamingo.png";

const playerImage3 = new Image();
playerImage3.src = "animationyoda.png";

const playerImage4 = new Image();
playerImage4.src = "animationandres.png";

const playerImage5 = new Image();
playerImage5.src = "animationivan.png";

const playerImage6 = new Image();
playerImage6.src = "animationfernando.png";

const playerImage7 = new Image();
playerImage7.src = "animationkarolina.png";

const playerImage8 = new Image();
playerImage8.src = "animationnadeem.png";

const portalImage = new Image();
portalImage.src = "portal.png";

const enemyImage = new Image();
enemyImage.src = "taxi.png";
const enemyPatImage = new Image();
enemyPatImage.src = "roguelikecreatures.png";

const ammoImage = new Image();
ammoImage.src = "pelotas.png";

const goldImage = new Image();
goldImage.src = "gold.png";

const wingsImage = new Image();
wingsImage.src = "wings.png";

const bulletImage = new Image();
bulletImage.src = "bullet.png";

const bulletSamImage = new Image();
bulletSamImage.src = "bulletSamu.png";

const bulletSotoImage = new Image();
bulletSotoImage.src = "bulletSoto.png";

const bulletAndresImage = new Image();
bulletAndresImage.src = "tears.png";

const bulletIvanImage = new Image();
bulletIvanImage.src = "ticket.png";

const bulletFerImage = new Image();
bulletFerImage.src = "excel.png";

const bulletKarolaImage = new Image();
bulletKarolaImage.src = "sound.png";

const bulletNadeemImage = new Image();
bulletNadeemImage.src = "boina.png";

const phantomBulletImage = new Image();
phantomBulletImage.src = "phantombullet.png";

const fanShotImage = new Image();
fanShotImage.src = "fanshot.png";


const bulletProImage = new Image();
bulletProImage.src = "bulletpro.png";

const bossbulletImage = new Image();
bossbulletImage.src = "pill.png";

const attackImage = new Image();
attackImage.src = "raqueta.png";

const bulletTaxiImage = new Image();
bulletTaxiImage.src = "tire.png";

const hearthImage = new Image();
hearthImage.src = "hearth.png";

const shoeImage = new Image();
shoeImage.src = "shoe.png";

const shieldImage = new Image();
shieldImage.src = "shield.png";

const bossImage = new Image();
bossImage.src = "poctboss.png";

const backgroundImage = new Image();
backgroundImage.src = "bg.png";

const backgroundMerchantImage = new Image();
backgroundMerchantImage.src = "bgmerchant.png";

const backgroundloreImage = new Image();
backgroundloreImage.src = "backgroundlore.jpg";

const backgroundloreImage2 = new Image();
backgroundloreImage2.src = "backgroundlore2.jpg";

const rockImage = new Image();
rockImage.src = "rock.png";

const rockImage2 = new Image();
rockImage2.src = "rock2.png";

const smokeImage = new Image();
smokeImage.src = "smoke.png";

const growImage = new Image();
growImage.src = "winstrol.png";

const shrinkImage = new Image();
shrinkImage.src = "fatburner.png";

const braveImage = new Image();
braveImage.src = "brave.png";

const arrowImage = new Image();
arrowImage.src = "bullets.png";

const cobasintImage = new Image();
cobasintImage.src = "cobasint.png";

const alpineImage = new Image();
alpineImage.src = "alpine.png";

class Obstacle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rockSpawned = Math.random() > 0.5 ? rockImage : rockImage2;
  }

  draw() {
    // ctx.fillStyle = "brown";
    // ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.drawImage(this.rockSpawned, this.x, this.y, this.size, this.size);
  }
}
class Portal {
  constructor(x, y, size,destination) {
    this.x = x;
    this.y = y;
    this.size = size;
	this.destination=destination;
 
  }

  draw() {
    // ctx.fillStyle = "brown";
    // ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.drawImage(portalImage, this.x, this.y, this.size, this.size+10);
  }
}
class Sales {
  constructor(x, y, size, type,price,quantity) {
    this.x = x;
    this.y = y;
    this.size = size;
	this.type = type
	this.price = price
	this.quantity = quantity
    this.value = (Math.round(Math.random() *10,0)+1) *level;
  }

  draw() {
    // ctx.fillStyle = "brown";
    // ctx.fillRect(this.x, this.y, this.size, this.size);
	//"noWalls","phantomShot","ammo","health","shield","fanShoot"
	ctx.font = "48px Arial";
		ctx.fillStyle = "gold";
		ctx.textAlign = "center";
	if (this.type==="noWalls")
	{
		ctx.drawImage(wingsImage, this.x, this.y, this.size, this.size);
		ctx.fillText(this.price+"$", this.x+100,this.y+250);
	}
	if (this.type==="phantomShot")
	{
		ctx.drawImage(phantomBulletImage, this.x, this.y, this.size, this.size);
		ctx.fillText(this.price+"$", this.x+100,this.y+250);
	}
	if (this.type==="ammo")
	{
		ctx.drawImage(ammoImage, this.x, this.y, this.size, this.size);
		ctx.fillText(this.price+"$", this.x+100,this.y+250);
	}
	if (this.type==="medikit")
	{
		ctx.drawImage(hearthImage, this.x, this.y, this.size, this.size);
		ctx.fillText(this.price+"$", this.x+100,this.y+250);
	}
	if (this.type==="shield")
	{
		ctx.drawImage(shieldImage, this.x, this.y, this.size, this.size);
		ctx.fillText(this.price+"$", this.x+100,this.y+250);
	}
	if (this.type==="fanShoot")
	{
		ctx.drawImage(fanShotImage, this.x, this.y, this.size, this.size);
		ctx.fillText(this.price+"$", this.x+100,this.y+250);
	}
	ctx.font = "24px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("X "+this.quantity, this.x+90,this.y+170);
  }
}

class Drop {
  constructor(x, y, size, type) {
    this.x = x;
    this.y = y;
    this.size = size;
	this.type = type
    this.value = (Math.round(Math.random() *10,0)+1) *level;
  }

  draw() {
    // ctx.fillStyle = "brown";
    // ctx.fillRect(this.x, this.y, this.size, this.size);
	if (this.type==="gold")
	{
		ctx.drawImage(goldImage, this.x, this.y, this.size, this.size);
	}
	if (this.type==="ammo")
	{
		ctx.drawImage(ammoImage, this.x, this.y, this.size, this.size);
	}
  }
}
function overlaps(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}



let score = 0;
let maxScore = 0;

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "rigth";
  ctx.fillText("Score: " + score, canvas.width - 120, 30);
  ctx.fillText("Monsters to go: " + killed +"/" + Math.round(levelMonsters,0), canvas.width - 700, 30);
  ctx.fillText("Max Score: " + maxScore, canvas.width - 163, 50);
  ctx.fillText("Level: " + level, canvas.width - 116, 70);
}



class Bullet {
  constructor(x, y, direction, image, isPlayer, extrasize) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.size = 20 +extrasize;
    this.speed = 2;
	this.enemydamage = level;
	this.playerdamage = player.damage;
    this.image = image;
	this.isPlayer=isPlayer;
	this.owner="enemy";
  }

 update() {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = directions.indexOf(this.direction);
  const angle = (2 * Math.PI * index) / directions.length;
  this.x -= this.speed * Math.cos(angle);
  this.y -= this.speed * Math.sin(angle);


    // Eliminar la bala si colisiona con un obstáculo
    if (checkObstacleCollisions(this) && ((!player.phantomShot && this.isPlayer) || !this.isPlayer)){
      return false; // Indica que la bala debe ser eliminada
    }
    return true; // Indica que la bala debe permanecer en el mapa
  }

  draw() {
	if (selectedPlayer===7 && this.isPlayer)
	{
		const directions = [ "E","ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N", "NNE", "NE", "ENE"];
		let index=directions.indexOf(this.direction);
		ctx.drawImage(arrowImage,index*162, 162, 162, 162, this.x-this.size/2, this.y-this.size/2, this.size, this.size);	
		this.size=this.size+1;
	} else
	  if (this.owner==="brave")
	  {
		  
		  const directions = [ "E","ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N", "NNE", "NE", "ENE"];
		const index = directions.indexOf(this.direction);
		ctx.fillText("Score: " + this.direction, canvas.width /2, 30);
		ctx.drawImage(this.image,index*162, 0, 162, 162, this.x, this.y, this.size+40, this.size+40);	
	  }
	  else
	  {
		ctx.drawImage(this.image, this.x, this.y, this.size, this.size);

	  }
  }
}
let cx = 200; // Coordenada x del centro
		let cy = 200; // Coordenada y del centro
		let radius = 50; // Distancia desde el centro al enemigo
		let theta = 0; // Ángulo inicial en radianes
class Boss {
  constructor(x, y,level,movement) {
    this.x = x;
    this.y = y;
    this.size = 200;
    this.hp = level*10;
    this.speed = 0.2 * level;
    this.fireCooldown = 500 - level*50;
	this.name="Boss";
	this.type="Boss";
	this.movement=movement;
	this.cx=200;
	this.cy = 200;
	this.radius = 50;
	this.theta = 0;
	this.step=1;
	this.collisiondamage=10;
	this.targetx=radius;
	this.targety=radius;
	this.targetr=radius;
	
  }

  move() {
    // Mover el enemigo hacia el jugador
		const previousX = this.x;
		const previousY = this.y;
	if (this.movement==="player")
	{
		const dx = player.x - this.x;
		const dy = player.y - this.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		

		this.x += (dx / distance) * this.speed;

		// Verificar colisión en el eje X
		if (!((this.x > 0) && (this.x + this.size < canvas.width) )){
			this.x = previousX;
		}
	
		this.y += (dy / distance) * this.speed;
	
		// Verificar colisión en el eje Y
		if (!((this.y > 0) &&(this.y + this.size < canvas.height) )){
			this.y = previousY;
		}
		
	}
	
	if (this.movement==="updown")
	{
		this.y += this.step* this.speed;

		// Verificar colisión en el eje Y
		
		
			if (!((this.x > 0) && (this.x + this.size < canvas.width) &&(this.y > 0) &&(this.y + this.size < canvas.height) )){
		this.x = previousX;
			this.y = previousY;
			 this.step = -this.step;
		}
	}
	if (this.movement==="leftRight")
	{
		this.x += this.step* this.speed;

		// Verificar colisión en el eje x
			if (!((this.x > 0) && (this.x + this.size < canvas.width) &&(this.y > 0) &&(this.y + this.size < canvas.height)) ){
		this.x = previousX;
			this.y = previousY;
			 this.step = -this.step;
		}
	}
	if (this.movement==="circle")
	{
		
		const omega = 0.05;
		if (this.cx>this.targetx && (((this.x-2 > 0) && (this.x-2 + this.size < canvas.width) &&(this.y > 0) &&(this.y + this.size < canvas.height) )))
		{
			this.cx-=2;
		}
		if (this.cx<this.targetx && (((this.x+2 > 0) && (this.x+2 + this.size < canvas.width) &&(this.y > 0) &&(this.y + this.size < canvas.height) )))
		{
			this.cx+=2;
		}
		if (this.cy>this.targety && (((this.x > 0) && (this.x + this.size < canvas.width) &&(this.y-2 > 0) &&(this.y-2 + this.size < canvas.height) )))
		{
			this.cy-=2;
		}
		if (this.cy<this.targety && (((this.x > 0) && (this.x + this.size < canvas.width) &&(this.y+2 > 0) &&(this.y+2 + this.size < canvas.height) )))
		{
			this.cy+=2;
		}
		if (this.radius>this.targetr && (((this.x-2 > 0) && (this.x-2 + this.size < canvas.width) &&(this.y-2 > 0) &&(this.y-2 + this.size < canvas.height) )))
		{
			this.radius-=2;
		}
		if (this.radius<this.targetr && (((this.x+2 > 0) && (this.x+2 + this.size < canvas.width) &&(this.y+2 > 0) &&(this.y+2 + this.size < canvas.height) )))
		{
			this.radius+=2;
		}
		this.x = this.cx + this.radius * Math.cos(this.theta);
		this.y = this.cy + this.radius * Math.sin(this.theta);
		this.theta += omega;
		/*if (!((this.x > 0) && (this.x + this.size < canvas.width) &&(this.y > 0) &&(this.y + this.size < canvas.height) )){
			this.x = previousX;
			this.y = previousY;
		}*/

		
	}
 }
  

 shoot() {
  if (this.fireCooldown <= 0) {
    const bulletX = this.x + this.size / 2;
    const bulletY = this.y + this.size / 2;
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const angle = Math.atan2(dy, dx);
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const index = Math.round(directions.length * ((angle + Math.PI) / (2 * Math.PI))) % directions.length;
    const direction = directions[index];
	//let bulletbosses  =[["samu",playerImage2],["soto",playerImage3],["andres",playerImage4],["ivan",playerImage5],["fernando",playerImage6],["karolina",playerImage7],["nadeem",playerImage8],["poct1a",bossImage]];
	for (i=0;i<3;i++)
	{
		let bullet = new Bullet(bulletX, bulletY, directions[index+i], bossbulletImage,false,0);
		enemyBullets.push(bullet);
		bullet = new Bullet(bulletX, bulletY, directions[index-i], bossbulletImage,false,0);
		enemyBullets.push(bullet);
	}
	this.targetr=Math.random()*canvas.height/5;
	this.targetx=(Math.random()*canvas.width)-this.size;
	this.targety=(Math.random()*canvas.height)-this.size;
	this.cx=this.x;
	this.cy=this.y;
    this.fireCooldown = 500 - level*5;
  } else {
    this.fireCooldown--;
  }
}
  draw() {
	let bosses  =[["samu",playerAvatar2],["soto",playerAvatar3],["andres",playerAvatar4],["ivan",playerImage5],["fernando",playerImage6],["karolina",playerImage7],["nadeem",playerImage8],["poct1a",bossImage]];
	
	  let currentboss=bosses[Math.max((level/5)-1,0)];
	  this.name=currentboss[0];
    ctx.drawImage(currentboss[1], this.x, this.y, this.size, this.size);

    // Barra de salud del enemigo
    ctx.fillStyle = "black";
    ctx.fillRect(this.x - 2, this.y - 10, this.size + 4, 6);
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y - 8, this.size * (this.hp / (level*10)), 2);
	const moveboss=["updown","leftRight","circle", "player"];
	if (this.hp/(level*10) <0.8)
	{
		this.movement=moveboss[0];
	} 
	if (this.hp/(level*10) <0.5)
	{
		this.movement=moveboss[1];
	} 
	if (this.hp/(level*10) <0.2)
	{
		this.movement=moveboss[2];
	} 
	if (this.hp/(level*10) <0.1)
	{
		this.movement=moveboss[3];


	} 
	
  }
}
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 60;
    this.hp = level;
    this.speed = 0.2 * level;
    this.fireCooldown = 500 - level*50;
	this.step =1;
	this.stepx =1;
	this.stepy =1;
	this.type="Enemy";
	this.movement="player";
	this.cx=200;
	this.cy = 200;
	this.radius = 50;
	this.theta = 0;
	this.collisiondamage=1;
	this.shooting=true;
	this.facing = 0;
	this.phase=0;
  }

  move() {
    // Mover el enemigo hacia el jugador
	const previousX = this.x;
	const previousY = this.y;
if (this.movement==="player")
{
	const dx = player.x - this.x;
	const dy = player.y - this.y;
	const distance = Math.sqrt(dx * dx + dy * dy);

	

	this.x += (dx / distance) * this.speed;

	// Verificar colisión en el eje X
	if (!checkObstacleCollisions(this) &&!((this.x > 0) && (this.x + this.size < canvas.width) )){
		this.x = previousX;
	}

	this.y += (dy / distance) * this.speed;

	// Verificar colisión en el eje Y
	if (!checkObstacleCollisions(this) &&!((this.y > 0) &&(this.y + this.size < canvas.height) )){
		this.y = previousY;
	}
	
}

if (this.movement==="updown")
{
	this.y += this.step* this.speed;

	// Verificar colisión en el eje Y
	
	
		if (!checkObstacleCollisions(this) &&!((this.y > 0) && (this.y + this.size < canvas.height) )){
	this.x = previousX;
		this.y = previousY;
		 this.step = -this.step;
	}
}
if (this.movement==="leftRight")
{
	this.x += this.step* this.speed;

	// Verificar colisión en el eje x
		if ( !checkObstacleCollisions(this)&&!((this.x > 0) && (this.x + this.size < canvas.width) )){
	this.x = previousX;
		this.y = previousY;
		 this.step = -this.step;
	}
}
if (this.movement==="circle")
	{
		
		const omega = 0.05;
		if (this.cx>this.targetx && (((this.x-2 > 0) && (this.x-2 + this.size < canvas.width) &&(this.y > 0) &&(this.y + this.size < canvas.height) )))
		{
			this.cx-=2;
		}
		if (this.cx<this.targetx && (((this.x+2 > 0) && (this.x+2 + this.size < canvas.width) &&(this.y > 0) &&(this.y + this.size < canvas.height) )))
		{
			this.cx+=2;
		}
		if (this.cy>this.targety && (((this.x > 0) && (this.x + this.size < canvas.width) &&(this.y-2 > 0) &&(this.y-2 + this.size < canvas.height) )))
		{
			this.cy-=2;
		}
		if (this.cy<this.targety && (((this.x > 0) && (this.x + this.size < canvas.width) &&(this.y+2 > 0) &&(this.y+2 + this.size < canvas.height) )))
		{
			this.cy+=2;
		}
		if (this.radius>this.targetr && (((this.x-2 > 0) && (this.x-2 + this.size < canvas.width) &&(this.y-2 > 0) &&(this.y-2 + this.size < canvas.height) )))
		{
			this.radius-=2;
		}
		if (this.radius<this.targetr && (((this.x+2 > 0) && (this.x+2 + this.size < canvas.width) &&(this.y+2 > 0) &&(this.y+2 + this.size < canvas.height) )))
		{
			this.radius+=2;
		}
		this.x = this.cx + this.radius * Math.cos(this.theta);
		this.y = this.cy + this.radius * Math.sin(this.theta);
		this.theta += omega;
		/*if (!((this.x > 0) && (this.x + this.size < canvas.width) &&(this.y > 0) &&(this.y + this.size < canvas.height) )){
			this.x = previousX;
			this.y = previousY;
		}*/

		
	}
	if (this.movement==="circuit")
	{
		if ((this.x+ this.speed<    canvas.width-this.size) && this.stepx===1) {
			this.x +=  this.speed;
			this.stepy=1;
			this.facing=3;
			if ( checkObstacleCollisions(this)){
				this.stepx=0;
				this.x = previousX;
		this.y = previousY;
			}
		}
		else if ((this.y+ this.speed<  canvas.height-this.size )&& this.stepy===1){
				this.y +=  this.speed;
				this.stepx=0;
				this.facing=0;
				if ( checkObstacleCollisions(this)){
					this.stepy=0;
					this.x = previousX;
					this.y = previousY;
				}
				
				
			} else if ((this.x- this.speed>  this.size && this.stepx===0) ){
			
				this.stepy=0;
				this.x -=  this.speed;
				this.facing=2;
				if ( checkObstacleCollisions(this)){
					this.stepx=2;
					this.x = previousX;
					this.y = previousY;
				}
			}
			else if  ((this.y* this.speed>  this.size && this.stepy===0)){
				this.y -= this.speed;
				this.facing=1;
				if ( checkObstacleCollisions(this)){
					this.stepy=2
					this.x = previousX;
					this.y = previousY;
				}
			}
			else
			{this.stepx=1;
			this.speed+=0.5;
			this.step=0}
			// Verificar colisión en el eje x
		if ( checkObstacleCollisions(this)&& this.step===0){
			this.stepx=1;
			this.stepy=1;
			this.step=1;
			this.x = previousX;
		this.y = previousY;
		}
	
		

	}
	
  }

 shoot() {
  if (this.fireCooldown <= 0 && this.shooting) {
    const bulletX = this.x + this.size / 2;
    const bulletY = this.y + this.size / 2;
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const angle = Math.atan2(dy, dx);
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const index = Math.round(directions.length * ((angle + Math.PI) / (2 * Math.PI))) % directions.length;
    const direction = directions[index];
	if (this.type!="cobasint")
	{
		const bullet = new Bullet(bulletX, bulletY, direction, bossbulletImage,false,0);
		if (this.type==="brave")
		{
			bullet.image=arrowImage;
			bullet.owner="brave";
		}
		if (this.type==="alpine")
		{
			bullet.image=bulletTaxiImage;
			
		}
		enemyBullets.push(bullet);
	}
	else
	{
		this.phase+=1;
		if (this.phase>2)
		{
			this.phase=0;
		}
	}
	this.targetr=Math.random()*canvas.height/5;
	this.cx=this.x;
	this.cy=this.y;
	this.targetx=(Math.random()*canvas.width)-this.size;
	this.targety=(Math.random()*canvas.height)-this.size;
    this.fireCooldown = 500 - level*5;
  } else {
    this.fireCooldown--;
  }
}

  draw() {
	if (this.type==="brave")
	{
		ctx.drawImage(braveImage, this.x, this.y, this.size, this.size);
	}
	else
	if (this.type==="alpine")
	{
		ctx.drawImage(alpineImage,this.facing*701, 0, 701, 645, this.x, this.y, this.size, this.size);	
	}
	else
    if (this.type==="player")
	{
	ctx.drawImage(enemyPatImage,2*spriteEWidth/8, spriteEHeight/9, spriteEWidth/8, spriteEHeight/9, this.x, this.y, this.size, this.size);	
	}
	else
    if (this.type==="cobasint")
	{
		ctx.drawImage(cobasintImage,0, this.phase*132, 254, 132, this.x, this.y, this.size+10, this.size);	
		this.collisiondamage=level*6*this.phase;
	}
	else 
	{
	ctx.drawImage(enemyImage, this.x, this.y, this.size, this.size);
	}
    // Barra de salud del enemigo
    ctx.fillStyle = "black";
    ctx.fillRect(this.x - 2, this.y - 10, this.size + 4, 6);
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y - 8, this.size * (this.hp / level), 2);
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 80;
    this.speed = 2;
    this.hp = 10;
	this.damage=1;
	this.physicdamage=1;
	this.shield=0;
	this.money=800;
	this.ammo=0;
	this.ammosize=0;
	this.noWalls=false;
	this.phantomShot=false;
	this.fanShoot=0;
	this.medikit=0;
	this.direction="none";
	this.name="Francis";
  }

  drawStats() {
	  let playernames=["Francis","Samu","Soto","Andrés","Ivan","Fernando","Karolina","Nadeem"]
	 
	  
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Velocidad de movimiento: " + this.drawStat("speed"), 10, 20);
    // ctx.fillText("Velocidad de disparo: " + this.shotSpeed, 10, 40);
    ctx.fillText("Salud de "+playernames[selectedPlayer-1]+": " + this.drawStat("hearth"), 10, 40);
	ctx.fillText("Escudo de "+playernames[selectedPlayer-1]+": " + this.drawStat("shield"), 10, 60);
	ctx.fillText("Ataque de "+playernames[selectedPlayer-1]+": " + this.drawStat("attack"), 10, 80);
	ctx.fillText("Dinerito de "+playernames[selectedPlayer-1]+": " + this.money + "$", 10, 100);
	
	if (specialActivated)
	{
		ctx.fillStyle = "green";
		
	}
	else
	{
		ctx.fillStyle = "red";
	}
	ctx.fillText("Munición de "+playernames[selectedPlayer-1]+": " + this.ammo + "🪩", 10, 120);
	ctx.fillText("Medikits "+playernames[selectedPlayer-1]+": " + this.medikit + "💉", 10, 140);
	if (this.phantomShot){
		ctx.drawImage(phantomBulletImage, 10, 160, 15, 15);
	}
	if (this.noWalls){
		ctx.drawImage(wingsImage, 30, 160, 15, 15);
	}
	if (this.fanshoot>0){
		ctx.drawImage(fanShotImage, 50, 160, 15, 15);
	}
  }

  drawStat(item) {
    let hearths = "";
	let itemlist=[["hearth",this.hp,"❤"],["shield",this.shield,"🛡"],["attack",this.damage,"🗡"],["speed",this.speed,"🦼"],["money",this.money,"$"]];
	let result = itemlist.filter(function(v,i) {return v[0] === item;})[0];
	for (var i = 0; i < result[1]; i++) {
			 hearths += result[2];
		}
	
	return hearths;
  }
  drawShield() {
    let hearths = "";
    for (var i = 0; i < this.shield; i++) {
      hearths += "🛡";
	  
    }
	return hearths;
  }

  draw() {
	  const playeravatars=[[playerImage,0,0],[playerImage2,10,0],[playerImage3,20,0],[playerImage4,0,0],[playerImage5,25,25],[playerImage6,0,0],[playerImage7,20,0],[playerImage8,10,0]];
	  let avatar=playeravatars[selectedPlayer-1];
	  if (selectedPlayer>8 )
	  {
		
		  ctx.drawImage(avatar[0], this.x, this.y, this.size+avatar[1], this.size+avatar[2]);
		 
	  }
	   else
	  {
		  let walkingDirections=["down","right","left","up"]
		  if (this.direction!="none")
		  {
				ctx.drawImage(avatar[0],currentFrame * spriteWidth,walkingDirections.indexOf(this.direction) * spriteHeight, spriteWidth, spriteHeight, this.x, this.y, this.size+avatar[1], this.size+avatar[2]);	  
		  } else {
				ctx.drawImage(avatar[0],0,0, spriteWidth, spriteHeight, this.x, this.y, this.size+avatar[1], this.size+avatar[2]);
		  }
		if (ticks%20===0)
		{
		 currentFrame++;
		  if (currentFrame >= frameCount) {
			currentFrame = 0;
		  }
		  ticks=0;
		}
		ticks++
	  }
	
    ctx.fillStyle = "black";
    ctx.fillRect(this.x - 2, this.y - 10, this.size + 4, 6);
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y - 8, this.size * (this.hp / (15+level)), 2);
  }

  checkObstacle() {
    const obstacle = obstacles.find(
      (obs) => this.y > obs.y && this.y < obs.y + obs.size
    );

    return obstacle == undefined;
  }

  moveLeft() {
    const previousX = this.x;
    if (this.x > 0) {
      this.x -= this.speed;
    }
    if (checkObstacleCollisions(this) && !this.noWalls) {
      this.x = previousX;
    }
	this.direction="left";
  }

  moveRight() {
    const previousX = this.x;
	
    if (this.x + this.size < canvas.width) {
      this.x += this.speed;
    }
    if (checkObstacleCollisions(this) && !this.noWalls) {
      this.x = previousX;
    }
	this.direction="right";
  }

  moveUp() {
    const previousY = this.y;
	
    if (this.y > 0) {
      this.y -= this.speed;
    }
    if (checkObstacleCollisions(this)&& !this.noWalls) {
      this.y = previousY;
    }
	this.direction="up";
  }
	stop() {
		this.direction="none";
	}
  moveDown() {
    const previousY = this.y;
    if (this.y + this.size < canvas.height) {
      this.y += this.speed;
    }
    if (checkObstacleCollisions(this)&& !this.noWalls) {
      this.y = previousY;
    }
	this.direction="down";
  }

  shoot(direction) {
    const bulletX = this.x + this.size / 2;
    const bulletY = this.y + this.size / 2;
	
	if (this.ammo>0 && specialActivated){
		this.ammo-=1;
		const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
		directions.forEach((direction) => {const bullet = new Bullet(bulletX, bulletY, direction, bulletProImage,true,this.ammosize);
			bullet.playerdamage=bullet.playerdamage*2;
			bullets.push(bullet);
		});
	}
	else{
		const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
		const playerbulletimages= [bulletImage,bulletSamImage,bulletSotoImage,bulletAndresImage,bulletIvanImage,bulletFerImage,bulletKarolaImage,bulletNadeemImage];
		let playerbulletimage=playerbulletimages[selectedPlayer-1];
		
		 let bullet = new Bullet(bulletX, bulletY, direction, playerbulletimage,true,this.ammosize);
		 bullets.push(bullet);
		 for (i=1; i<=this.fanShoot;i++)
		 {
			bullet = new Bullet(bulletX, bulletY, directions[directions.indexOf(direction)+i], playerbulletimage,true,this.ammosize);
			bullets.push(bullet);
			bullet = new Bullet(bulletX, bulletY, directions[directions.indexOf(direction)-i], playerbulletimage,true,this.ammosize);
			bullets.push(bullet);
		 }
	
	}
  }
}
const powerTypes=["speed","hp","shield","damage","grow","shrink"]
const powerTypesImages=[shoeImage,hearthImage,shieldImage,attackImage,growImage,shrinkImage]
function spawnPowerUp() {
  const x = Math.random() * (canvas.width - 20);
  const y = Math.random() * (canvas.height - 20);
  const typeselected =Math.round(Math.random() * powerTypes.length )%powerTypes.length;
  let pwtype=powerTypes[typeselected];
  if (gameState==="running"){
	powerUps.push(new PowerUp(x, y, pwtype));
  }
  setTimeout(spawnPowerUp, powerUpSpawnInterval);
}
const powerUpsActions = {
		  "speed": () => { player.speed += 1 },
		  "hp": () => { if (player.hp < 15+level) { player.hp += 1 } },
		  "shield": () => { player.shield += 1 },
		  "damage": () => { player.damage += 1 },
		  "grow":() => { player.size += 10; player.ammosize+=5;player.physicdamage+=1 },
		  "shrink":() => { player.size -= 10; player.ammosize-=5;player.physicdamage-=1 },
		  "":() =>{}
		};
class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.size = 35;
    this.type = type;
    this.timeRemaining = 10000; // 5000ms = 5 segundos
  }

  draw() {
	  if (typeof powerTypesImages[powerTypes.indexOf(this.type)] !== 'undefined') {
		ctx.drawImage(powerTypesImages[powerTypes.indexOf(this.type)], this.x, this.y, this.size, this.size);
	  }
	  else
	  {
		 ctx.drawImage(powerTypesImages[0], this.x, this.y, this.size, this.size);
	  }
    
  }
}
spawnPowerUp();

const player = new Player(canvas.width / 2, canvas.height / 2);
let bullets = [];
let enemies = [];
let enemyBullets = [];

let spawnCooldown = 100;

function generateObstacles() {
  const numObstacles = 10; // Número de obstáculos a generar
  const minSize = 40; // Tamaño mínimo del obstáculo
  const maxSize = 100; // Tamaño máximo del obstáculo
  obstacles=[]	
  for (let i = 0; i < numObstacles; i++) {
    const size = Math.random() * (maxSize - minSize) + minSize;
    const x = Math.random() * (canvas.width - size);
    const y = Math.random() * (canvas.height - size);

    const obstacle = new Obstacle(x, y, size);
	if (!checkCollision(obstacle, player)){
		obstacles.push(obstacle);
	}
	else{
		i-=1;
	}
  }
}

function checkObstacleCollisions(obj) {
  for (const obstacle of obstacles) {
    if (overlaps(obj, obstacle)) {
      return true;
    }
  }
  return false;
}

function moveWithCollision(obj, dx, dy) {
  const previousX = obj.x;
  const previousY = obj.y;

  obj.x += dx;
  obj.y += dy;

  if (checkObstacleCollisions(obj)) {
    obj.x = previousX;
    obj.y = previousY;
  }
}
generateObstacles();
let damageCooldown=0;
function gameLoop() {
	if (gameState === "running") {
		let portal = "";
		generated=false;
		levelentered=false;
		intro=0;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

		obstacles.forEach((obstacle) => {
		obstacle.draw();
		let damageCooldown=100;
	});
player.stop();
	if (keys["w"] || keys["W"]) {
		player.moveUp();
	}
	if (keys["a"] || keys["A"]) {
		player.moveLeft();
	}
	if (keys["s"] || keys["S"]) {
		player.moveDown();
	}
	if (keys["d"] || keys["D"]) {
		player.moveRight();
	}
    if (!levelend)
	{
	for (let i = 0; i < bullets.length; i++) {
		bullets[i].update();
		bullets[i].draw();

		// Remover balas fuera del canvas
		if (bullets[i].x < 0 ||	bullets[i].x > canvas.width ||	bullets[i].y < 0 ||	bullets[i].y > canvas.height) {
			bullets.splice(i, 1);
			i--;
		}
	}

	// Dibujar y actualizar enemigos
	for (const enemy of enemies) {
		enemy.move();
		enemy.shoot();
		enemy.draw();
	}

	// Dibujar y actualizar balas enemigas
	for (let i = 0; i < enemyBullets.length; i++) {
		enemyBullets[i].update();
		enemyBullets[i].draw();

		// Remover balas enemigas fuera del canvas
		if (enemyBullets[i].x < 0 || enemyBullets[i].x > canvas.width || enemyBullets[i].y < 0 || enemyBullets[i].y > canvas.height) {
			enemyBullets.splice(i, 1);
			i--;
		}
	}
	// Colisiones jugador - enemigos
	for (let i = 0; i < enemies.length; i++) {
		if (enemies[i].x < player.x + player.size && enemies[i].x + enemies[i].size > player.x && enemies[i].y < player.y + player.size && enemies[i].y + enemies[i].size > player.y) {
			if (damageCooldown <= 0) {
				player.hp-=Math.max(enemies[i].collisiondamage-player.shield,0);
				enemies[i].hp-=player.physicdamage;
				damageCooldown = 50;
				({ i, portal } = checkKillEnemy(i, portal));
			
			if (player.shield>0) {
				player.shield-=0.2;
			}
			i--;
			if (player.hp <= 0) {
				// El jugador ha perdido, reiniciar el juego
				if (score > maxScore) {
					maxScore = score;
				}
				gameState = "gameOver";
				score = 0;
				player.hp = 15+level;
				enemies.length = 0;
				enemyBullets.length = 0;
				player.speed = 4;
				powerUps = [];
			}
		} else {
			damageCooldown--;
		  }
		}
	}
	// Colisiones jugador - balas enemigas
	for (let i = 0; i < enemyBullets.length; i++) {
		if (enemyBullets[i].x < player.x + player.size && enemyBullets[i].x + enemyBullets[i].size > player.x && enemyBullets[i].y < player.y + player.size && enemyBullets[i].y + enemyBullets[i].size > player.y) {
			player.hp-=Math.max(enemyBullets[i].enemydamage-player.shield,0);
			if (player.shield>0) {
				player.shield-=0.2;
			}
			enemyBullets.splice(i, 1);
			i--;
			if (player.hp <= 0) {
				// El jugador ha perdido, reiniciar el juego
				if (score > maxScore) {
					maxScore = score;
				}
				gameState = "gameOver";
				score = 0;
				player.hp = 15+level;
				enemies.length = 0;
				enemyBullets.length = 0;
				player.speed = 4;
				powerUps = [];
			}
		}
	}

	// Colisiones enemigo - balas jugador
	for (let i = 0; i < bullets.length; i++) {
		for (let j = 0; j < enemies.length; j++) {
			if ( bullets[i].x < enemies[j].x + enemies[j].size && bullets[i].x + bullets[i].size > enemies[j].x && bullets[i].y < enemies[j].y + enemies[j].size && bullets[i].y + bullets[i].size > enemies[j].y) {
				enemies[j].hp-=bullets[i].playerdamage;
				bullets.splice(i, 1);
				i--;
				score += 15;
				({ j, portal } = checkKillEnemy(j, portal));
				break;
			}
		}
	}

	// Generar enemigos
	if (!noEnemies && (levelMonsters>(enemies.length+killed+1))) {
		if (spawnCooldown <= 0) {
			spawnEnemy();
			spawnCooldown = 100;
		} else {
			spawnCooldown--;
		}
	}

	// Actualizar y eliminar balas si es necesario
	bullets = bullets.filter((bullet) => bullet.update());
	enemyBullets = enemyBullets.filter((bullet) => bullet.update());

	
	// Dibujar y actualizar powerups
	powerUps.forEach((powerUp, index) => {
		powerUp.draw();
		
		
		if (checkCollision(player, powerUp)) {
			try
			{
				powerUpsActions[powerUp.type]();
			}
			catch(error) {powerUpsActions["speed"]();}
			powerUps.splice(index, 1);
		} else {
			powerUp.timeRemaining -= 1000 / 60; // Restamos el tiempo transcurrido por cada iteración de gameLoop

			if (powerUp.timeRemaining <= 0) {
				powerUps.splice(index, 1);
			}
		}
	});
	}
	drops.forEach((drop, index) => {
		drop.draw();
		if (checkCollision(player, drop)) {
			if (drop.type==="gold")
			{
				player.money+=drop.value;
			}
			if (drop.type==="ammo")
			{
				player.ammo+=drop.value;
			}
			drops.splice(index,1);
		}
	});
	player.draw();
	player.drawStats();
	drawScore();
	portals.forEach((portalspa, index) => {
		portalspa.draw();
		if (checkCollision(player, portalspa)) {
			gameState =portalspa.destination;
			portals.splice(index,1);
		}
	});
	} else if (gameState === "gameOver") {
		if (intro===0){
			resetGame();
			showDeath();
		}
	}
	else if (gameState === "nextLevel") {

		
		levelUp();
		gameState === "waiting"
		levelend=false;
	}
	else if (gameState === "notStarted") {

		if (intro===0)
		{
			showIntro();
			resetGame();
			generateObstacles();
		}
	}
	else if (gameState === "paused") {
		showPause();
	}
	else if (gameState === "merchant") {
		showMerchant();
		generateObstacles();
		levelend=false;
	}
requestAnimationFrame(gameLoop);
}
function checkKillEnemy(j, portal) {
	if (enemies[j].hp <= 0) {
		killed += 1;
		if (enemies[j].type === "Boss") {
			score += 100;
			localStorage.setItem(enemies[j].name, true);
		}
		if (Math.random() > 0.5) {
			const golddrop = new Drop(enemies[j].x, enemies[j].y, enemies[j].size, "gold");
			drops.push(golddrop);
		}
		else {
			const ammodrop = new Drop(enemies[j].x, enemies[j].y, enemies[j].size, "ammo");
			ammodrop.value = 1;
			drops.push(ammodrop);
		}
		enemies.splice(j, 1);

		score += 33; // Añade 33 puntos por enemigo debilitado
		j--;
		if (killed >= levelMonsters - 1) {
			levelend = true;
			if (level % 5 === 0) {
				portal = new Portal(canvas.width / 2, canvas.height / 2, 60, "merchant");
				portals.push(portal);

			}

			else {
				portal = new Portal(canvas.width / 2, canvas.height / 2, 60, "nextLevel");
				portals.push(portal);


			}

		}
	}
	return { j, portal };
}

function showMerchant() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(backgroundMerchantImage, 0, 0, canvas.width, canvas.height);
	enemies=[];
	obstacles=[];
	if (!generated)
	{
		portal = new Portal((canvas.width/4)*3, (canvas.height/4)*3, 60, "nextLevel");
		portals.push(portal);
		salesObjects=[];
		player.x=canvas.width/2;
		player.y=canvas.height-200;
		
		let powerUps=["ammo","medikit","shield","fanShoot","noWalls","phantomShot"];
		let powerUpsPrice=["10","20","30","800","500","800"];
		let powerUpsQuantity=["100","1","1","1","1","1"];
		let selected=Math.round((Math.random()*7),0) %6;
		let salesObject = new Sales(canvas.width/5-20, canvas.height/2.5, 150,powerUps[selected],powerUpsPrice[selected],powerUpsQuantity[selected] );
		salesObjects.push(salesObject);
		ctx.font = "48px Arial";
		ctx.fillStyle = "gold";
		ctx.textAlign = "center";
		
		selected=Math.round((Math.random()*7),0) %6;
		salesObject = new Sales(canvas.width/2-75, canvas.height/2.5, 150,powerUps[selected],powerUpsPrice[selected],powerUpsQuantity[selected] );
		salesObjects.push(salesObject);
		
		selected=Math.round((Math.random()*7),0) %6;
		salesObject = new Sales((canvas.width/3)*2+150, canvas.height/2.5, 150,powerUps[selected],powerUpsPrice[selected],powerUpsQuantity[selected] );
		salesObjects.push(salesObject);
		
		generated=true;
	}
	salesObjects.forEach((drop, index) => {
			drop.draw();
			if (checkCollision(player, drop)) {
				let purchased=false;
			if (drop.type === "noWalls" && player.money>=drop.price) {
				player.noWalls = true;
				player.money-=drop.price;
				purchased=true;
			} else if (drop.type === "phantomShot" && player.money>=drop.price) {
				player.phantomShot = true;
				player.money-=drop.price;
				purchased=true;
			} else if (drop.type === "ammo"&& player.money>=drop.price) {
				player.ammo += 100;
				player.money-=drop.price;
				purchased=true;
			}
			else if (drop.type === "medikit"&& player.money>=drop.price) {
				player.medikit += 1;
				player.money-=drop.price;
				purchased=true;
			}
			else if (drop.type === "shield"&& player.money>=drop.price) {
				player.shield += 1;
				player.money-=drop.price;
				purchased=true;
			}
			else if (drop.type === "fanShoot"&& player.money>=drop.price) {
				player.fanShoot += 1;
				player.money-=drop.price;
				purchased=true;
			}
			if (purchased) {
				salesObjects.splice(index, 1);
			}
		} 
	
			});
		player.stop();	
	if (keys["w"] || keys["W"]) {
		player.moveUp();
	}
	if (keys["a"] || keys["A"]) {
		player.moveLeft();
	}
	if (keys["s"] || keys["S"]) {
		player.moveDown();
	}
	if (keys["d"] || keys["D"]) {
		player.moveRight();
	}
	portals.forEach((portalspa, index) => {
		portalspa.draw();
		if (checkCollision(player, portalspa)) {
			gameState =portalspa.destination;
			portals.splice(index,1);
		}
	});
	player.draw();
	player.drawStats();
	drawScore();
}
function resetGame() {
	score = 0;
	player.hp = 1;
	player.shield = 0;
	player.damage = 1;
	player.ammo = 0;
	player.money = 800;
	player.noWalls=false;
	player.phantomShot=false;
	player.fanShoot=false;
	player.medikit=0;
	level=1;
	enemies.length = 0;
	enemyBullets.length = 0;
	player.speed = 4;
	powerUps = [];
	enemies=[];
	obstacles=[];
	drops=[];
}
function checkCollision(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}
function spawnBoss(level) {
  let x, y;
  let validSpawn = false;

  while (!validSpawn) {
    x = Math.random() * (canvas.width - 100);
    y = Math.random() * (canvas.height - 100);
    const tempEnemy = new Boss(x, y);

    validSpawn = !obstacles.some((obstacle) =>
      checkCollision(tempEnemy, obstacle)
    );
  }
  const moveboss=["player","updown","leftRight","circle"];
  
  const enemy = new Boss(x, y,level,moveboss[Math.round(Math.random()*moveboss.length)%moveboss.length]);
  enemy.cx=Math.random()*(canvas.width -enemy.size);
  enemy.cy=Math.random()*(canvas.height -enemy.size);
  enemy.targetr=Math.random()*canvas.height/5;
  enemy.targetx=(Math.random()*canvas.width)-enemy.size;
  enemy.targety=(Math.random()*canvas.height)-enemy.size;
  enemies.push(enemy);
}

function spawnEnemy() {
  let x, y;
  let validSpawn = false;

  while (!validSpawn) {
    x = Math.random() * (canvas.width - 32);
    y = Math.random() * (canvas.height - 32);
    const tempEnemy = new Enemy(x, y);

    validSpawn = !obstacles.some((obstacle) =>
      checkCollision(tempEnemy, obstacle)
    );
  }
  const enemy = new Enemy(x, y);
  
  const moveboss=["player","updown","leftRight","circle"];
  enemy.movement=moveboss[Math.round(Math.random()*moveboss.length)%moveboss.length]
  let value=(Math.random()*(level/5));
  if (value<1)
  {
  }
  else
  if (value<2)
  {
	  	enemy.type="alpine";
		enemy.movement="circuit";
		enemy.collisiondamage=level*2;
		enemy.shooting=true;
		enemy.speed=3;
  } else if (value<3)
  {
	  	enemy.type="player";
		enemy.movement="player";
		enemy.collisiondamage=level*2;
		enemy.shooting=false;
		enemy.speed=player.speed+1;
  }
  else if (value<4)
  {
	  	enemy.type="brave";
		enemy.movement="updown";
		enemy.collisiondamage=level*2;
		enemy.shooting=true;
		enemy.speed=0.5;
	
  }
  
  else if (value<5)
  {
	  	enemy.type="cobasint";
		enemy.movement="none";
		enemy.collisiondamage=level*6;
		enemy.shooting=true;
		enemy.size+=40;
  }
  enemy.cx=Math.random()*(canvas.width -enemy.size);
  enemy.cy=Math.random()*(canvas.height -enemy.size);
  enemy.targetr=Math.random()*canvas.height/5;
  enemy.targetx=(Math.random()*canvas.width)-enemy.size;
  enemy.targety=(Math.random()*canvas.height)-enemy.size;
  enemies.push(enemy);
}

const keys = {};

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    player.shoot("E");
  } else if (event.key === "ArrowDown") {
    player.shoot("W");
  } else if (event.key === "ArrowLeft") {
    player.shoot("N");
  } else if (event.key === "ArrowRight") {
    player.shoot("S");
  } else {
    keys[event.key] = true;
  }
});

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});
async function levelUp() {
	if (!levelentered)
	{
		levelentered=true;
	let boss=false;
	enemies=[];
	bullets=[];
	enemyBullets=[];
	generateObstacles();
	level+=1;
	killed=0;
	player.hp=15+level;
	if (level%5===0) {
		enemies=[];
		levelMonsters= 1;
		noEnemies=true;
		spawnBoss(level);
		boss=true;
	}
	else {
		levelMonsters= Math.random()*level +10;
		noEnemies=false;
	}
	for (i=1;i>=0;i--){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.font = "48px Arial";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		ctx.fillText("Level Completed!", canvas.width / 2, canvas.height / 2);
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("Starting next level in "+i+" seconds", canvas.width / 2, canvas.height / 2+50);
		if (boss) {
			ctx.fillStyle = "red";
			ctx.textAlign = "center";
			ctx.fillText("BOSS Incoming!!!", canvas.width / 2, canvas.height / 2+100);
		}
		ctx.font = "24px Arial";
		ctx.fillStyle = "green";
		ctx.textAlign = "center";
		ctx.fillText("press space to skip", canvas.width / 2, canvas.height / 2+120);
		await sleep(1000);
	}
	gameState = "running";
	}
}
async function showIntro() {
	intro=1;
	await showIntroa();
}
		
async function showIntroa() {
 	let displacement=-300;
	for (i=1;i<10;i++){
		score = 0;
		player.hp = 15;
		enemies.length = 0;
		enemyBullets.length = 0;
		player.speed = 2;
		powerUps = [];
		level=1;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (i%2===0){
			ctx.drawImage(backgroundloreImage, 0, 0, canvas.width, canvas.height);
		}
		else{
			ctx.drawImage(backgroundloreImage2, 0, 0, canvas.width, canvas.height);
			//
		}
		ctx.font = "72px Arial";
		ctx.fillStyle = "lightgreen";
		ctx.textAlign = "center";
		ctx.fillText("The Binding of Asimov: Taxist's rebellion", canvas.width / 2, canvas.height / 2 + displacement);
		ctx.font = "24px Arial";
		//ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("The evil taxi drivers have joined forces with the terrible POCT1A to spoil Francis' retirement,", canvas.width / 2, canvas.height / 2 + displacement +60);
		ctx.fillText("now Asimovians must face them armed with their favorite weapons. Can you", canvas.width / 2, canvas.height / 2 + displacement +90);
		ctx.fillText("guide them to victory?", canvas.width / 2, canvas.height / 2 + displacement +120);
		ctx.drawImage(playerAvatar, canvas.width/11 *2, canvas.height/2+50, canvas.width/18, canvas.height/16);
		ctx.fillText("Francis?", canvas.width / 11 *2+55, canvas.height / 2+150);
		if (localStorage.getItem("samu"))
		{
		ctx.drawImage(playerAvatar2, canvas.width/11 *3, canvas.height/2+40, canvas.width/18, canvas.height/16);
		ctx.fillText("Samu?", canvas.width /11 *3+55, canvas.height / 2+140);
		}
		else
		{
		ctx.drawImage(playerImageU, canvas.width/11 *3, canvas.height/2+40, canvas.width/18, canvas.height/16);
		ctx.fillText("Unknown?", canvas.width /11 *3+55, canvas.height / 2+140);	
		}
		if (localStorage.getItem("soto"))
		{
		ctx.drawImage(playerAvatar3, canvas.width/11 *4, canvas.height/2 +30, canvas.width/18, canvas.height/16);
		ctx.fillText("Soto?", canvas.width /11 *4+55, canvas.height / 2+130);
		}
		else
		{
		ctx.drawImage(playerImageU, canvas.width/11 *4, canvas.height/2+40, canvas.width/18, canvas.height/16);
		ctx.fillText("Unknown?", canvas.width /11 *4+55, canvas.height / 2+140);	
		}
		if (localStorage.getItem("andres"))
		{
		ctx.drawImage(playerAvatar4, canvas.width/11*5, canvas.height/2+20, canvas.width/18, canvas.height/16);
		ctx.fillText("Andres?", canvas.width / 11*5+55, canvas.height / 2+120);
		}
		else
		{
		ctx.drawImage(playerImageU, canvas.width/11 *5, canvas.height/2+40, canvas.width/18, canvas.height/16);
		ctx.fillText("Unknown?", canvas.width /11 *5+55, canvas.height / 2+140);	
		}
		if (localStorage.getItem("ivan"))
		{
		ctx.drawImage(playerAvatar5, canvas.width/11*6, canvas.height/2+20, canvas.width/18, canvas.height/16);
		ctx.fillText("Ivan?", canvas.width / 11*6+55, canvas.height / 2+120);
		}
		else
		{
		ctx.drawImage(playerImageU, canvas.width/11 *6, canvas.height/2+40, canvas.width/18, canvas.height/16);
		ctx.fillText("Unknown?", canvas.width /11 *6+55, canvas.height / 2+140);	
		}
		if (localStorage.getItem("fernando"))
		{
		ctx.drawImage(playerAvatar6, canvas.width/11*7, canvas.height/2+10, canvas.width/18+25, canvas.height/16+25);
		ctx.fillText("Fernando?", canvas.width / 11*7+55, canvas.height / 2+130);
		}
		else
		{
		ctx.drawImage(playerImageU, canvas.width/11 *7, canvas.height/2+40, canvas.width/18, canvas.height/16);
		ctx.fillText("Unknown?", canvas.width /11 *7+55, canvas.height / 2+140);	
		}
		if (localStorage.getItem("karolina"))
		{
		ctx.drawImage(playerAvatar7, canvas.width/11*8, canvas.height/2+40, canvas.width/18, canvas.height/16);
		ctx.fillText("Karolina?", canvas.width / 11*8+55, canvas.height / 2+140);
		}
		else
		{
		ctx.drawImage(playerImageU, canvas.width/11 *8, canvas.height/2+40, canvas.width/18, canvas.height/16);
		ctx.fillText("Unknown?", canvas.width /11 *8+55, canvas.height / 2+140);	
		}
		if (localStorage.getItem("nadeem"))
		{
		ctx.drawImage(playerAvatar8, canvas.width/11*9, canvas.height/2+50, canvas.width/18, canvas.height/16);
		ctx.fillText("Nadeem?", canvas.width / 11*9+55, canvas.height / 2+150);
		}
		else
		{
		ctx.drawImage(playerImageU, canvas.width/11 *9, canvas.height/2+40, canvas.width/18, canvas.height/16);
		ctx.fillText("Unknown?", canvas.width /11 *9+55, canvas.height / 2+140);	
		}
		ctx.font = "36px Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("Use WASD to move Player and arrow keys to shoot.", canvas.width / 2, canvas.height / 2 + displacement +170);
		ctx.fillText("Press X to activate/deactivate special ammo or H to use a medikit.", canvas.width / 2, canvas.height / 2 +displacement +220);
		ctx.fillText("Press P to pause the game or ESC to reset it.", canvas.width / 2, canvas.height / 2 +displacement +270);
		ctx.fillText("Who will you choose?", canvas.width / 2, canvas.height / 2 +displacement +480);
		ctx.fillStyle = "green";
		ctx.textAlign = "center";
		//ctx.fillStyle = "orange";
		await  sleep(100);
	}
	ctx.font = "64px Arial";
	ctx.fillStyle = "yellow";
	ctx.textAlign = "center";
	ctx.fillText("Click on your prefered character to start the game ", canvas.width / 2, canvas.height / 2 +displacement +600);

}

async function showDeath() {
	intro=1;
	await showDeatha();
}
		
async function showDeatha() {
	resetGame();
	generateObstacles();
	let i=0;
	for (i=1;i<10;i++){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (i%2===0){
			ctx.drawImage(backgroundloreImage, 0, 0, canvas.width, canvas.height);
		}
		else{
			ctx.drawImage(backgroundloreImage2, 0, 0, canvas.width, canvas.height);
		}
		ctx.font = "48px Arial";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		const deathPhrases=["⚰⚰⚰⚰ Francis dies cruelly screaming \"Putos taxistas!\"⚰⚰⚰⚰","⚰⚰⚰⚰ Samu dies cruelly screaming \"Así es la vida, te jodes!\"⚰⚰⚰⚰","⚰⚰⚰⚰ Soto runs out of the map screaming \"Necesito un café!\"⚰⚰⚰⚰","⚰⚰⚰⚰ Andres dissapears sudently wispering \"Me voy a llorar a la llorería.\"⚰⚰⚰⚰","⚰⚰⚰⚰ Ivan melts into a blood puddle saying \"Vaya viaje tiene esa taxista!\"⚰⚰⚰⚰","⚰⚰⚰⚰ Fernando leaves the scene repeating for himself \"Story points, story points, story points...!\"⚰⚰⚰⚰","⚰⚰⚰⚰ Karolina vanishes... \"She is going to buy some Cardanos!\"⚰⚰⚰⚰","⚰⚰⚰⚰ Nadeem fleed out of the battlefield saying: \"Voy a calmar a los gemelos!\"⚰⚰⚰⚰"]
		ctx.fillText(deathPhrases[selectedPlayer-1], canvas.width / 2, canvas.height / 2-40);
		ctx.fillText("⚰⚰⚰⚰ GAME OVER ⚰⚰⚰⚰", canvas.width / 2, canvas.height / 2+40);
		await  sleep(100);
	}
	ctx.font = "24px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Press SPACE to start a new game.", canvas.width / 2, canvas.height / 2 + 80);
}
async function showPause() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(backgroundloreImage, 0, 0, canvas.width, canvas.height);
	ctx.font = "48px Arial";
	ctx.fillStyle = "green";
	ctx.textAlign = "center";
	ctx.fillText("Game Paused", canvas.width / 2, canvas.height / 2 -60);
	ctx.font = "52px Arial";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.fillText("The Binding of Francis: Taxist's revelion", canvas.width / 2, canvas.height / 2);
	ctx.font = "36px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("Press space to resume the game", canvas.width / 2, canvas.height / 2+70);
}

function sleep(milliseconds) {
   return new Promise(resolve => setTimeout(resolve, milliseconds));
}


window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
	  if (gameState!="merchant")
	  {
		  gameState = "running";
	  }
  }
  if (event.code === "KeyP") {
    gameState = "paused";
  }
  if (event.code === "KeyH") {
    if (player.medikit>0)
	{
		player.hp=15+level;
		player.medikit-=1;
	}
  }
   if (event.code === "KeyX") {
    specialActivated = !specialActivated;
  }
  
   if (event.code === "Escape") {
	intro=0;
    gameState = "notStarted";
  }
});
canvas.addEventListener('click', function(event) {
	
	 if (gameState==="notStarted")
	  {
		
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
document.body.removeChild(document.getElementById("Info"));
    if (x > canvas.width/11 *2 - 50 && x < canvas.width/11 *2  + canvas.width/18 &&
        y > canvas.height/2 +50 && y < canvas.height/2 +50+ canvas.height/16) {
        selectedPlayer = 1;
		gameState = "running";
    } else if (x > canvas.width/11 *3 -50 && x < canvas.width/11 *3 + canvas.width/18 &&
               y > canvas.height/2 +40 && y < canvas.height/2+40 + canvas.height/16) {
        if (localStorage.getItem("samu"))
		{
			selectedPlayer = 2;
			gameState = "running";
		}
		
    }else if (x > canvas.width/11 *4 -50 && x < canvas.width/11 *4 + canvas.width/18 &&
               y > canvas.height/2+30 && y < canvas.height/2 +30+ canvas.height/16) {
		 if (localStorage.getItem("soto"))
		{
        selectedPlayer = 3;
		gameState = "running";
		}
    }else if (x > canvas.width/11 *5 -50 && x < canvas.width/11 *5 + canvas.width/18 &&
               y > canvas.height/2 +20 && y < canvas.height/2+20  + canvas.height/16) {
         if (localStorage.getItem("andres"))
		{
        selectedPlayer = 4;
		gameState = "running";
		}
    }
	else if (x > canvas.width/11 *6-50 && x < canvas.width/11 *6 + canvas.width/18 &&
               y > canvas.height/2 +20 && y < canvas.height/2+20 + canvas.height/16) {
         if (localStorage.getItem("ivan"))
		{
        selectedPlayer = 5;
		gameState = "running";
		}
    }
	else if (x > canvas.width/11 *7 -50 && x < canvas.width/11 *7 + canvas.width/18 &&
               y > canvas.height/2+30 && y < canvas.height/2+30 + canvas.height/16) {
         if (localStorage.getItem("fernando"))
		{
        selectedPlayer = 6;
		gameState = "running";
		}
    }
	else if (x > canvas.width/11 *8 -50 && x < canvas.width/11 *8 + canvas.width/18 &&
               y > canvas.height/2+40 && y < canvas.height/2+40 + canvas.height/16) {
         if (localStorage.getItem("karolina"))
		{
        selectedPlayer = 7;
		gameState = "running";
		}
    }
	else if (x > canvas.width/11 *9 -50 && x < canvas.width/11 *9 + canvas.width/18 &&
               y > canvas.height/2+50 && y < canvas.height/2+50 + canvas.height/16) {
         if (localStorage.getItem("nadeem"))
		{
        selectedPlayer = 8;
		gameState = "running";
		}
    }
	
	  
	  }
});
canvas.addEventListener('mousemove', function(event) {
	
	 if (gameState==="notStarted")
	  {
		
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

     if (x > canvas.width/11 *2 - 50 && x < canvas.width/11 *2  + canvas.width/18 &&
        y > canvas.height/2 +50 && y < canvas.height/2 +50+ canvas.height/16) {
        createInfo(1);
    } else if (x > canvas.width/11 *3 -50 && x < canvas.width/11 *3 + canvas.width/18 &&
               y > canvas.height/2 +40 && y < canvas.height/2+40 + canvas.height/16) {
		if (localStorage.getItem("samu"))
		{
			createInfo(2);
		}
		else
		{
			createInfo(0);
		}

    }else if (x > canvas.width/11 *4 -50 && x < canvas.width/11 *4 + canvas.width/18 &&
               y > canvas.height/2+30 && y < canvas.height/2 +30+ canvas.height/16) {
        if (localStorage.getItem("soto"))
		{
			createInfo(3);
		}else
		{
			createInfo(0);
		}
    }else if (x > canvas.width/11 *5 -50 && x < canvas.width/11 *5 + canvas.width/18 &&
               y > canvas.height/2 +20 && y < canvas.height/2+20  + canvas.height/16) {
        if (localStorage.getItem("andres"))
		{
			createInfo(4);
		}else
		{
			createInfo(0);
		}
    }
	else if (x > canvas.width/11 *6-50 && x < canvas.width/11 *6 + canvas.width/18 &&
               y > canvas.height/2 +20 && y < canvas.height/2+20 + canvas.height/16) {
        if (localStorage.getItem("ivan"))
		{
			createInfo(5);
		}else
		{
			createInfo(0);
		}
    }
	else if (x > canvas.width/11 *7 -50 && x < canvas.width/11 *7 + canvas.width/18 &&
               y > canvas.height/2+30 && y < canvas.height/2+30 + canvas.height/16) {
        if (localStorage.getItem("fernando"))
		{
			createInfo(6);
		}else
		{
			createInfo(0);
		}
    }
	else if (x > canvas.width/11 *8 -50 && x < canvas.width/11 *8 + canvas.width/18 &&
               y > canvas.height/2+40 && y < canvas.height/2+40 + canvas.height/16) {
        if (localStorage.getItem("karolina"))
		{
			createInfo(7);
		}else
		{
			createInfo(0);
		}
    }
	else if (x > canvas.width/11 *9 -50 && x < canvas.width/11 *9 + canvas.width/18 &&
               y > canvas.height/2+50 && y < canvas.height/2+50 + canvas.height/16) {
        if (localStorage.getItem("nadeem"))
		{
			createInfo(8);
		}else
		{
			createInfo(0);
		}
    }
	else
	{
		if (document.getElementById("Info")) {
			document.body.removeChild(document.getElementById("Info"));
		}
	}
	
	 
	  }
});

function createInfo(player){
{
	if (document.getElementById("Info"))
			{
				document.body.removeChild(document.getElementById("Info"));
			}
	const popupDiv = document.createElement("div");
	popupDiv.id="Info";
popupDiv.style.position = "absolute";
popupDiv.style.top = canvas.height/2+90;
popupDiv.style.left = canvas.width/11 *2;
popupDiv.style.position = "absolute";
popupDiv.style.background = "white";
popupDiv.style.border = "1px solid black";
popupDiv.style.padding = "10px";
popupDiv.style.borderRadius = "5px";
popupDiv.style.boxShadow = "3px 3px 3px grey";
const contents=["Derrota al jefe correspondiente para desbloquear a este personaje!","Este es Francis, nuestro protagonista,\n armado con su raqueta,\n  lanza pelotas de padel a sus enemigos.","Este es Samu, flamingo guy,\n armado con baldosas del suelo de Barcelona,\n  entierra a sus enemigos por lapidación.","Este es Soto, el Maestro,\n sus tazas de café ponen nerviosos a sus enemigos hasta hacerles sufrir infartos de corazón.","Este es Andrés, desprecia sus propias habilidades quejándose continuamente hasta que a sus enemigos se les hincha la cabeza y explotan.","Este es Ivan, entierra a sus enemigos en montañas de tickets regalo.","Este es Fernando, Scrum Master de fortuna, su especialidad es confundir a sus enemigos hasta la muerte.", "Esta es Karolina, su potente voz causa derrames cerebrales a sus enemigos.","Este es Nadeem, lanzando su boina es capaz de decapitar hasta al enemigo más duro."]
popupDiv.textContent = contents[player];
document.body.appendChild(popupDiv);
}
}
gameLoop();
