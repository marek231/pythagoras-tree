window.onload = function() {
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var width = canvas.width = window.innerWidth;
	var height = canvas.height = window.innerHeight;
	var slider = document.getElementById("myRange");
	slider.min = -Math.PI / 2;
	slider.max = Math.PI / 2;
	slider.step = 0.01;
	slider.defaultValue = slider.min;
	
	// Create tree bark gradient.
	var grd = context.createLinearGradient(0, 0, 0, -150);
	grd.addColorStop(0, "#703800");
	grd.addColorStop(1, "#FFB973");
	context.fillStyle = grd;
	
	// The angle will vary between -PI/2 and 0.
	var branchAngleA = - Math.PI / 4 + Math.sin(Number(slider.value)) * Math.PI / 4;
	tree(width / 2 - 100, height, height/20, 0, 8);
	
	// Redraw the tree on slider drag.
	slider.oninput = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		branchAngleA = - Math.PI / 4 + Math.sin(Number(slider.value)) * Math.PI / 4;
		tree(width / 2 - 100, height/20, 200, 0, 8);
	}
	
	// Recursive tree drawing function.
	/*
		x, y - initial coordinates for the bottom left corner of the square
		size - size of the square's sides
		angle - initial angle
		limit - recursion limit
	*/
	function tree(x, y, size, angle, limit) {
		context.save();
		context.translate(x, y);
		context.rotate(angle);
		context.fillRect(0, 0, size, - size);
		
		// Left branch 
		var x0 = 0;
		var y0 = -size;
		var size0 = Math.abs(Math.cos(branchAngleA) * size);
		var angle0 = branchAngleA;
		
		if(limit > 0) {
			tree(x0, y0, size0, angle0, limit - 1);
		}
		else {
			context.fillStyle = "#82d435";
			context.save();
			context.translate(x0, y0);
			context.rotate(angle0);
			context.fillRect(0, 0, size0, - size0);
			context.restore();
		}
		
		//Right branch 
		var x1 = x0 + Math.cos(angle0) * size0;
		var y1 = y0 + Math.sin(angle0) * size0;
		var size1 = Math.abs(Math.sin(branchAngleA) * size);
		var angle1 = angle0 + Math.PI / 2;
		
		if(limit > 0) {
			tree(x1, y1, size1, angle1, limit - 1);
		}
		else {
			context.fillStyle = "#82d435";
			context.save();
			context.translate(x1, y1);
			context.rotate(angle1);
			context.fillRect(0, 0, size1, - size1);
			context.restore();
		}
		
		context.restore();
	}
}
