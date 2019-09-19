air = 0; block = 1; water = [10,11,12,13,14]; lava = [15,16,17,18,19];
ids = [
	{
		doesCollide : function (x, y, ax) {
			// console.log(9);
			return false;
		},
		isFull : true,
	}, //0 Air
	{
		isFull : true,
		draw : function (x,y,w,h,i,j) {
			t = tiles[i][j];
			//fillRect(ctx1,x,y,w,h,"blue",1,"white");
			//ctx1.drawImage(sprite,72,432,70,70,x,y,w,h);
			fillRect(ctx1, x , y, w, h, level[levelNo].colorA);
			if(i > 0 && tiles[i-1][j]!=t) {
				fillRect(ctx1, x, y, w/10, h, level[levelNo].colorB);
				fillRect(ctx1, x + w/10, y, w/10, h, "white");
			}
			//console.log(i, tiles.length);
			if(i+1 < tiles.length) {
				if(tiles[i+1][j]!=t) {
					fillRect(ctx1, x + w - w/5, y, w/10, h, "white");
					fillRect(ctx1, x + w - w/10, y, w/10, h, level[levelNo].colorB);
				}			
			}
				fillRect(ctx1, x, y, w, h/10, level[levelNo].colorB);
				fillRect(ctx1, x, y + w/10, w, h/10, "white");
				fillRect(ctx1, x, y + h - w/5, w, h/10, "white");
				fillRect(ctx1, x, y + h - w/10, w, h/10, level[levelNo].colorB);

			//fillRect(ctx1, x, y + w/10, w, h/5, level[levelNo].colorB,w/15, "white");
		},
		doesCollide : function (x, y, ax) {
			return true;
		},
		doesKill : false
	}, //1 Base block
	{
		draw : function (x,y,w,h) {
			ctx1.beginPath();
    		ctx1.moveTo(x, y + h);
			ctx1.strokeStyle = level[levelNo].colorB;
			ctx1.lineWidth = w/10;
    		ctx1.lineTo(x + w/2, y);
    		ctx1.lineTo(x + w, y + h);
    		//ctx1.lineTo(x, y + h)
    		ctx1.fillStyle = level[levelNo].colorC;
    		ctx1.fill();
    		ctx1.stroke();
		},
		doesCollide : function(x, y, ax) {
			console.log();
			//if((x>grid/2  && (grid-y)/(grid-x) <= 1) || (x<grid/2 && (grid-y)/(x) <= 1) || (x==grid/2)) {
			if( colTri([x, y],[0, grid],[grid/2, 0],[grid, grid]) ) {
				player.respawn();
				return true;
			} else {
				return false;
			}
		},
		doesKill : true
	}, //2 Up thorn
	{
		draw : function (x,y,w,h) {
			//console.log(Math.abs((player.x + player.w/2) - (x + grid/2 + camX)));
			if( mode == "player" ){
				ah = Math.min(Math.abs((player.x + player.w/2) - (x + grid/2 + camX)), 3*grid)/3;
			} else {
				ah = 0;
			}
		if(ah < grid) {	
			ctx1.beginPath();
    		ctx1.moveTo(x + 2, y + h);
			ctx1.strokeStyle = level[levelNo].colorA;
			ctx1.lineWidth = w/10;
    		ctx1.lineTo(x + w/2, y + 2 + ah);
    		ctx1.lineTo(x + w - 2, y + h);
    		ctx1.fillStyle = level[levelNo].colorB;
    		ctx1.fill();
    		ctx1.stroke();
    	}
		},
		doesCollide : function(x, y, ax) {
			if( colTri([x, y],[0, grid],[grid/2, 0],[grid, grid]) ) {
				player.respawn();
				return true;
			} else {
				return false;
			}
		},
		doesKill : true
	}, //3 Up thorn burried
	{
		draw : function (x,y,w,h) {
    		ctx1.fillStyle = level[levelNo].colorC;
			ctx1.strokeStyle = level[levelNo].colorB;
			ctx1.lineWidth = w/10;

			ctx1.beginPath();
    		ctx1.moveTo(x, y + h);
    		ctx1.lineTo(x + w, y + h/2);
    		ctx1.lineTo(x, y);
    		ctx1.fill();
    		ctx1.stroke();
		},
		doesCollide : function(x, y, ax) {
			if( colTri([x, y],[0, 0],[grid, grid/2],[0, grid]) ) {
				player.respawn();
				return true;
			} else {
				return false;
			}
		},
		doesKill : true
	}, //4 Right thorn
	{
		draw : function (x,y,w,h) {
    		ctx1.fillStyle = level[levelNo].colorB;
			ctx1.strokeStyle = level[levelNo].colorA;
			ctx1.lineWidth = w/10;
			if( mode == "player" ){
				aw = Math.min(Math.abs((player.x + player.w/2) - (x + grid/2 + camX)), 3*grid)/3;
			} else {
				aw = 0;
			}
		if(aw < grid) {	
			ctx1.beginPath();
    		ctx1.moveTo(x, y + h);
    		ctx1.lineTo(x + w - aw, y + h/2);
    		ctx1.lineTo(x, y);
    		ctx1.fill();
    		ctx1.stroke();
		}
		},
		doesCollide : function(x, y, ax) {
			if( colTri([x, y],[0, 0],[grid, grid/2],[0, grid]) ) {
				player.respawn();
				return true;
			} else {
				return false;
			}
		},
		doesKill : true
	}, //5 Right thorn burried
	{
		draw : function (x,y,w,h) {
    		ctx1.fillStyle = level[levelNo].colorC;
			ctx1.strokeStyle = level[levelNo].colorB;
			ctx1.lineWidth = w/10;

			ctx1.beginPath();
    		ctx1.moveTo(x, y);
    		ctx1.lineTo(x + grid/2, y + h);
    		ctx1.lineTo(x + grid, y);
    		ctx1.fill();
    		ctx1.stroke();
		},
		doesCollide : function(x, y, ax) {
			if( colTri([x, y],[0, 0],[grid, 0],[grid/2, grid]) ) {
				player.respawn();
				return true;
			} else {
				return false;
			}
		},
		doesKill : true
	}, //6 Down thorn
	{
		draw : function (x,y,w,h) {
    		ctx1.fillStyle = level[levelNo].colorB;
			ctx1.strokeStyle = level[levelNo].colorA;
			ctx1.lineWidth = w/10;
			if( mode == "player" ){
				ah = Math.min(Math.abs((player.x + player.w/2) - (x + grid/2 + camX)), 3*grid)/3;
			} else {
				ah = 0;
			}
		if(ah < grid) {
			ctx1.beginPath();
    		ctx1.moveTo(x, y);
    		ctx1.lineTo(x + grid/2, y + h - ah);
    		ctx1.lineTo(x + grid, y);
    		ctx1.fill();
    		ctx1.stroke();
		}
		},
		doesCollide : function(x, y, ax) {
			if( colTri([x, y],[0, 0],[grid, 0],[grid/2, grid]) ) {
				player.respawn();
				return true;
			} else {
				return false;
			}
		},
		doesKill : true
	}, //7 Down thorn burried
	{
		draw : function (x,y,w,h) {
    		ctx1.fillStyle = level[levelNo].colorC;
			ctx1.strokeStyle = level[levelNo].colorB;
			ctx1.lineWidth = w/10;

			ctx1.beginPath();
    		ctx1.moveTo(x + w, y);
    		ctx1.lineTo(x, y + h/2);
    		ctx1.lineTo(x + w, y + h);
    		ctx1.fill();
    		ctx1.stroke();
		},
		doesCollide : function(x, y, ax) {
			if( colTri([x, y],[grid, grid],[grid, 0],[0, grid/2]) ) {
				player.respawn();
				return true;
			} else {
				return false;
			}
		},
		doesKill : true
	}, //8 Left thorn
	{
		draw : function (x,y,w,h) {
    		ctx1.fillStyle = level[levelNo].colorB;
			ctx1.strokeStyle = level[levelNo].colorA;
			ctx1.lineWidth = w/10;
			if( mode == "player" ){
				aw = Math.min(Math.abs((player.x + player.w/2) - (x + grid/2 + camX)), 3*grid)/3;
			} else {
				aw = 0;
			}
		if(aw < grid) {	
			ctx1.beginPath();
    		ctx1.moveTo(x + w, y);
    		ctx1.lineTo(x + aw, y + h/2);
    		ctx1.lineTo(x + w, y + h);
    		ctx1.fill();
    		ctx1.stroke();
		}
		},
		doesCollide : function(x, y, ax) {
			if( colTri([x, y],[grid, grid],[grid, 0],[0, grid/2]) ) {
				player.respawn();
				return true;
			} else {
				return false;
			}
		},
		doesKill : true
	}, //9 Left thorn burried
	{
		update : function (x,y,w,h,i,j) {
			if( j+1 < tiles[i].length ) {
				b = tiles[i][j+1];
				if( b == air ) {
					tiles[i][j+1] = water[1];
				} else if( ids[b].state == "liquid" && b != water[1]) {
					tiles[i][j+1] = water[1];
				} else {
					if(i > 0 && tiles[i-1][j] == 0) {

						tiles[i-1][j] = water[2];
					} else if( i > 0 && tiles[i-1][j] == water[3] ) {

						tiles[i-1][j] = water[4];
					} 
					if(i+1 < tiles.length && tiles[i+1][j] == 0) {

						tiles[i+1][j] = water[3];
					} else if(i+1 < tiles.length && tiles[i+1][j] == water[2]) {

						tiles[i+1][j] = water[4];
					}
				}
			}
		},
		draw : function (x,y,w,h,i,j) {
			if(j + 1 < tiles[i].length && ids[tiles[i][j+1]].isFull!=true) {
				h += h;
			}
			t = tiles[i][j];
			ctx1.globalAlpha = 0.8;
			fillRect(ctx1, x , y + grid/10, w, h - grid/10, "blue");
			ctx1.globalAlpha = 1;

		},
		doesCollide : function (x, y, ax) {
			return false;
		},
		isFull : true,
		doFloat : true,
		doesKill : false,
		state : "liquid",
		type : "water",
		flow : "S"
	}, //10 Water Source
	{
		update : function (x,y,w,h,i,j) {
			//console.log(ids[tiles[i][j+1]].isFull);
			if( j+1 < tiles[i].length ) {
				b = tiles[i][j+1];
				if( b == air ) {
					tiles[i][j+1] = water[1];
				} else if( ids[b].state == "liquid" && b != water[1]) {
					tiles[i][j+1] = water[1];
				} else if(b != water[1]) {
					if(i > 0 && tiles[i-1][j] == 0) {

						tiles[i-1][j] = water[2];
					} else if( i > 0 && tiles[i-1][j] == water[3] ) {

						tiles[i-1][j] = water[4];
					} 
					if(i+1 < tiles.length && tiles[i+1][j] == 0) {

						tiles[i+1][j] = water[3];
					} else if(i+1 < tiles.length && tiles[i+1][j] == water[2]) {

						tiles[i+1][j] = water[4];
					}
				}
			}

			if(j > 0 && ids[tiles[i][j-1]].state != "liquid") {

				tiles[i][j] = 0;
			}
		},
		draw : function (x,y,w,h,i,j) {
			if(j + 1 < tiles[i].length && ids[tiles[i][j+1]].isFull!=true) {
				h += h;
			}
			t = tiles[i][j];
			ctx1.globalAlpha = 0.8;
			fillRect(ctx1, x , y, w, h, "blue");
			ctx1.globalAlpha = 1;

		},
		doesCollide : function (x, y, ax) {
			return false;
		},
		doFloat : true,
		doesKill : false,
		state : "liquid",
		isFull : true,
		type : "water",
		flow : "D"
	}, //11 Water Flowing Down
	{
		update : function (x,y,w,h,i,j) {
			b = tiles[i][j+1];
			if(j+1 < tiles[i].length && (b==0 || (ids[b].state == "liquid" && b != water[1]))) {

				tiles[i][j+1] = water[1];
			}
			if(i+1 < tiles.length && tiles[i+1][j] != water[0] && tiles[i+1][j] != water[1]) {

				tiles[i][j] = 0;
			}
		},
		draw : function (x,y,w,h,i,j) {
			
			t = tiles[i][j];
			ctx1.globalAlpha = 0.8;
			ctx1.beginPath();
    		ctx1.moveTo(x, y + h);
    		ctx1.lineTo(x + w, y + h/10);
    		ctx1.lineTo(x + w, y + h);
    		ctx1.fillStyle = "blue";
    		ctx1.fill();
    		if(j + 1 < tiles[i].length && ids[tiles[i][j+1]].isFull!=true) {
				ctx1.fillRect(x,y+h,w,h);
			}
			ctx1.globalAlpha = 1;

		},
		doesCollide : function (x, y, ax) {
			return false;
		},
		doesKill : false,
		state : "liquid",
		type : "water"
	}, //12 Water Flowing Left
	{
		update : function (x,y,w,h,i,j) {
			b = tiles[i][j+1];
			if(j+1 < tiles[i].length && (b==0 || (ids[b].state == "liquid" && b != water[1]))) {

				tiles[i][j+1] = water[1];
			}
			if(i > 0 && tiles[i-1][j] != water[0] && tiles[i-1][j] != water[1]) {

				tiles[i][j] = 0;
			}
		},
		draw : function (x,y,w,h,i,j) {
			t = tiles[i][j];
			ctx1.globalAlpha = 0.8;
			ctx1.beginPath();
    		ctx1.moveTo(x, y + h/10);
    		ctx1.lineTo(x, y + h);
    		ctx1.lineTo(x + w, y + h);
    		ctx1.fillStyle = "blue";
    		ctx1.fill();
    		if(j + 1 < tiles[i].length && ids[tiles[i][j+1]].isFull!=true) {
				ctx1.fillRect(x,y+h,w,h);
			}
			ctx1.globalAlpha = 1;

		},
		doesCollide : function (x, y, ax) {
			return false;
		},
		doesKill : false,
		state : "liquid",
		type : "water"
	}, //13 Water Flowing Right
	{
		update : function (x,y,w,h,i,j) {
			b = tiles[i][j+1];
			if(j+1 < tiles[i].length && (b==0 || (ids[b].state == "liquid" && b != water[1]))) {

				tiles[i][j+1] = water[1];
			}
			if(i > 0 && (tiles[i-1][j] != water[0] && tiles[i-1][j] != water[1]) || (tiles[i+1][j] != water[0] && tiles[i+1][j] != water[1])) {

				tiles[i][j] = 0;
			}
		},
		draw : function (x,y,w,h,i,j) {
			
			t = tiles[i][j];
			ctx1.globalAlpha = 0.8;
			ctx1.beginPath();
    		ctx1.moveTo(x, y + h/10);
    		ctx1.lineTo(x, y + h);
    		ctx1.lineTo(x + w, y + h);
    		ctx1.lineTo(x + w, y + h/10);
    		ctx1.lineTo(x + w/2, y + h/5);
    		ctx1.fillStyle = "blue";
    		ctx1.fill();
    		if(j + 1 < tiles[i].length && ids[tiles[i][j+1]].isFull!=true) {
				ctx1.fillRect(x,y+h,w,h);
			}
			ctx1.globalAlpha = 1;

		},
		doesCollide : function (x, y, ax) {
			return false;
		},
		doesKill : false,
		state : "liquid",
		type : "water"
	}, //14 Water inflow
	{
		update : function (x,y,w,h,i,j) {
			if( j+1 < tiles[i].length ) {
				b = tiles[i][j+1];
				if( b == 0 ) {
					tiles[i][j+1] = lava[1];
				} else if( ids[b].state == "liquid" && b != lava[1]) {
					tiles[i][j+1] = lava[1];
				} else {
					if(i > 0 && (tiles[i-1][j] == 0 || tiles[i-1][j] == water[2] || tiles[i-1][j] == water[3] || tiles[i-1][j] == water[4])) {

						tiles[i-1][j] = lava[2];
					} else if( i > 0 && tiles[i-1][j] == lava[3] ) {

						tiles[i-1][j] = lava[4];
					}
					if(i+1 < tiles.length && (tiles[i+1][j] == 0 || tiles[i+1][j] == water[2] || tiles[i+1][j] == water[3] || tiles[i+1][j] == water[4])) {

						tiles[i+1][j] = lava[3];
					} else if(i+1 < tiles.length && tiles[i+1][j] == lava[2]) {

						tiles[i+1][j] = lava[4];
					}
				}
			}
		},
		draw : function (x,y,w,h,i,j) {
			if(j + 1 < tiles[i].length && ids[tiles[i][j+1]].isFull!=true) {
				h += h;
			}
			t = tiles[i][j];
			ctx1.globalAlpha = 1;
			fillRect(ctx1, x , y + grid/10, w, h - grid/10, "orange");
			ctx1.globalAlpha = 1;

		},
		doesCollide : function (x, y, ax) {
			// player.respawn();
			player.hp--;
			return false;
		},
		isFull : true,
		doFloat : true,
		doesKill : true,
		state : "liquid",
		type : "lava"
	}, //15 Lava Source
	{
		update : function (x,y,w,h,i,j) {
			//console.log(ids[tiles[i][j+1]].isFull);
			if( j+1 < tiles[i].length ) {
				b = tiles[i][j+1];
				if( b == 0 ) {
					tiles[i][j+1] = lava[1];
				} else if( ids[b].state == "liquid" && b != lava[1]) {
					tiles[i][j+1] = lava[1];
				} else if( b != lava[1] ) {
					if(i > 0 && (tiles[i-1][j] == 0 || tiles[i-1][j] == water[2] || tiles[i-1][j] == water[3] || tiles[i-1][j] == water[4])) {

						tiles[i-1][j] = lava[2];
					} else if( i > 0 && tiles[i-1][j] == lava[3] ) {

						tiles[i-1][j] = lava[4];
					}
					if(i+1 < tiles.length && (tiles[i+1][j] == 0 || tiles[i+1][j] == water[2] || tiles[i+1][j] == water[3] || tiles[i+1][j] == water[4])) {

						tiles[i+1][j] = lava[3];
					} else if(i+1 < tiles.length && tiles[i+1][j] == lava[2]) {

						tiles[i+1][j] = lava[4];
					}
				}
			}

			if(j > 0 && ids[tiles[i][j-1]].state != "liquid") {

				tiles[i][j] = 0;
			}
		},
		draw : function (x,y,w,h,i,j) {
			if(j + 1 < tiles[i].length && ids[tiles[i][j+1]].isFull!=true) {
				h += h;
			}
			t = tiles[i][j];
			ctx1.globalAlpha = 1;
			fillRect(ctx1, x , y, w, h, "orange");
			ctx1.globalAlpha = 1;

		},
		doesCollide : function (x, y, ax) {
			player.hp--;
			// player.respawn();
			return false;
		},
		doFloat : true,
		doesKill : false,
		state : "liquid",
		isFull : true,
		type : "lava"
	}, //16 Lava Flowing Down
	{
		update : function (x,y,w,h,i,j) {
			b = tiles[i][j+1];
			if(j+1 < tiles[i].length && (b==0 || (ids[b].state == "liquid" && b != lava[1]))) {

				tiles[i][j+1] = lava[1];
			}
			if(i+1 < tiles.length && tiles[i+1][j] != lava[0] && tiles[i+1][j] != lava[1]) {

				tiles[i][j] = 0;
			}
		},
		draw : function (x,y,w,h,i,j) {
			
			t = tiles[i][j];
			ctx1.globalAlpha = 1;
			ctx1.beginPath();
    		ctx1.moveTo(x, y + h);
    		ctx1.lineTo(x + w, y + h/10);
    		ctx1.lineTo(x + w, y + h);
    		ctx1.fillStyle = "orange";
    		ctx1.fill();
    		if(j + 1 < tiles[i].length && ids[tiles[i][j+1]].isFull!=true) {
				ctx1.fillRect(x,y+h,w,h);
			}
			ctx1.globalAlpha = 1;

		},
		doesCollide : function (x, y, ax) {
			if( colTri([x, y],[0, grid],[grid, grid],[grid, 0]) ) {
				player.hp--;
			}
			return false;
		},
		doesKill : false,
		state : "liquid",
		type : "lava"
	}, //17 Lava Flowing Left
	{
		update : function (x,y,w,h,i,j) {
			b = tiles[i][j+1];
			if(j+1 < tiles[i].length && (b==0 || (ids[b].state == "liquid" && b != lava[1]))) {

				tiles[i][j+1] = lava[1];
			}
			if(i > 0 && tiles[i-1][j] != lava[0] && tiles[i-1][j] != lava[1]) {

				tiles[i][j] = 0;
			}
		},
		draw : function (x,y,w,h,i,j) {
			t = tiles[i][j];
			ctx1.globalAlpha = 1;
			ctx1.beginPath();
    		ctx1.moveTo(x, y + h/10);
    		ctx1.lineTo(x, y + h);
    		ctx1.lineTo(x + w, y + h);
    		ctx1.fillStyle = "orange";
    		ctx1.fill();
    		if(j + 1 < tiles[i].length && ids[tiles[i][j+1]].isFull!=true) {
				ctx1.fillRect(x,y+h,w,h);
			}
			ctx1.globalAlpha = 1;

		},
		doesCollide : function (x, y, ax) {
			if( colTri([x, y],[0, grid],[grid, grid],[0, 0]) ) {
				player.hp--;
			}
			return false;
		},
		doesKill : false,
		state : "liquid",
		type : "lava"
	}, //18 Lava Flowing Right
	{
		update : function (x,y,w,h,i,j) {
			b = tiles[i][j+1];
			if(j+1 < tiles[i].length && (b==0 || (ids[b].state == "liquid" && b != lava[1]))) {

				tiles[i][j+1] = lava[1];
			}
			if(i > 0 && (tiles[i-1][j] != lava[0] && tiles[i-1][j] != lava[1]) || (tiles[i+1][j] != lava[0] && tiles[i+1][j] != lava[1])) {

				tiles[i][j] = 0;
			}
		},
		draw : function (x,y,w,h,i,j) {
			
			t = tiles[i][j];
			ctx1.globalAlpha = 1;
			ctx1.beginPath();
    		ctx1.moveTo(x, y + h/10);
    		ctx1.lineTo(x, y + h);
    		ctx1.lineTo(x + w, y + h);
    		ctx1.lineTo(x + w, y + h/10);
    		ctx1.lineTo(x + w/2, y + h/5);
    		ctx1.fillStyle = "orange";
    		ctx1.fill();
    		if(j + 1 < tiles[i].length && ids[tiles[i][j+1]].isFull!=true) {
				ctx1.fillRect(x,y+h,w,h);
			}
			ctx1.globalAlpha = 1;

		},
		doesCollide : function (x, y, ax) {
			player.hp--;
			return false;
		},
		doesKill : false,
		state : "liquid",
		type : "lava"
	}, //19 Lava inflow
	{
		isFull : true,
		draw : function (x,y,w,h,i,j) {
			
			},
		doesCollide : function (x, y, ax) {
			return false;
		},
		doesKill : false
	}, //Invisible Untouchable Base Block
];