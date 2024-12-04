let obstacles = [];
function overlaps(a, b) {
	return (
	  a.x < b.x + b.size &&
	  a.x + a.size > b.x &&
	  a.y < b.y + b.size &&
	  a.y + a.size > b.y
	);
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
  function checkCollision(a, b) {
	return (
	  a.x < b.x + b.size &&
	  a.x + a.size > b.x &&
	  a.y < b.y + b.size &&
	  a.y + a.size > b.y
	);
  }
  export {overlaps,moveWithCollision,generateObstacles,checkObstacleCollisions,moveWithCollision,checkCollision};