/* global chance */
"use strict";

class Platformer{
	constructor(canvas){
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		
		this.canvas.width = 800 / 5;
		this.canvas.height = 600 / 5;
		
		this.entities = [];
		
		for (var i = 0; i < 30; i++) {
			this.entities.push(new Entity(
				new PositionComponent(chance.integer({min:0, max:this.canvas.width}), chance.integer({min:0, max:this.canvas.width})),
				new HitboxComponent(chance.integer({min:2, max: 16}), chance.integer({min:2, max:16})),
				new ColorComponent(chance.color())
			));
		}
		
		this.ctx.imageSmoothingEnabled = false;

		window.requestAnimationFrame(this.loop.bind(this));
	}
	
	loop(){
		window.requestAnimationFrame(this.loop.bind(this));
		this.render(this.ctx);
	}
	
	render(ctx){
		ctx.imageSmoothingEnabled = false;
		ctx.fillStyle = 'hsl(0, 0%, 90%)';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
		this.entities.filter(function(entity){
			return (entity.hasComponent(PositionComponent) && 
			entity.hasComponent(HitboxComponent) &&
			entity.hasComponent(ColorComponent));
		}).forEach(function(entity){
			ctx.fillStyle = entity.getComponent(ColorComponent).color;
			ctx.fillRect(
				Math.round(entity.getComponent(PositionComponent).x), 
				Math.round(entity.getComponent(PositionComponent).y),
				Math.round(entity.getComponent(HitboxComponent).width),
				Math.round(entity.getComponent(HitboxComponent).height)
			);
		});
	}
}

class Point{
	constructor(x, y){
		this.x = x || 0;
		this.y = y || 0;
	}
}

class Entity{
	constructor(){
		this.components = Array.prototype.slice.call(arguments);
	}
	
	hasComponent(t){
		return this.components.filter(function(c){
			return (c instanceof t);
		});
	}
	
	getComponent(t){
		return this.components.filter(function(c){
			return (c instanceof t);
		})[0];
	}
}

class PositionComponent extends Point{
	constructor(x, y){
		super(x, y);
	}
}

class HitboxComponent{
	constructor(width, height, offset){
		this.offset = offset || new Point(0, 0);
		this.width = width || 1;
		this.height = height || width || 1;
	}
}

class Color{
	constructor(str){
		this.color = str;
	}
}

class ColorComponent extends Color{
	constructor(str){
		super(str);
	}
}