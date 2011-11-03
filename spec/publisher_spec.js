describe("Publisher", function() {
	var observer1;
	var observer2;
	var publisher1;
	var publisher2;

	beforeEach(function(){
		observer1 = {};
		observer2 = {};
		publisher1 = {};
		publisher2 = {};
		Publisher.extend(publisher1);
		Publisher.extend(publisher2);

		observer1.cb1count = 0;
		observer1.cb2count = 0;
		observer1.callback1 = function(p1,p2){
			observer1.cb1count++;
			observer1.cb1p1 = p1;
			observer1.cb1p2 = p2;
		};
		observer1.callback2 = function(p1,p2){
			observer1.cb2count++;
			observer1.cb2p1 = p1;
			observer1.cb2p2 = p2;
		};

		observer2.cb1count = 0;
		observer2.cb2count = 0;
		observer2.callback1 = function(p1,p2){
			observer2.cb1count++;
			observer2.cb1p1 = p1;
			observer2.cb1p2 = p2;
		};
		observer2.callback2 = function(p1,p2){
			observer2.cb2count++;
			observer2.cb2p1 = p1;
			observer2.cb2p2 = p2;
		};

	});

	describe("extending an object", function(){
		
		it("should add the publish method",function(){
			expect(publisher1.publish).toBeDefined();
		});

		it("should add the subscribe method",function(){
			expect(publisher1.subscribe).toBeDefined();
		});

		it("should add the unsubscribe method",function(){
			expect(publisher1.unsubscribe).toBeDefined();
		});

	});


	describe("simple listening", function(){
		
		beforeEach(function(){
			observer1.cb1count = 0;
			publisher1.subscribe("onAction",observer1.callback1);
		});

		it("should call the callback on the observer object", function(){
			publisher1.publish("onAction");
			expect(observer1.cb1count).toBe(1);
		});

		it("should unsubscribe", function(){
			publisher1.unsubscribe("onAction",observer1.callback1);
			publisher1.publish("onAction");
			expect(observer1.cb1count).toBe(0);
		});

	});


	describe("two objects listening for one event", function(){

		beforeEach(function(){
			observer1.cb1count = 0;
			observer2.cb1count = 0;
			publisher1.subscribe("onAction",observer1.callback1);
			publisher1.subscribe("onAction",observer2.callback1);
		});

		it("should call the callbacks on the observer objects", function(){
			publisher1.publish("onAction");
			expect(observer1.cb1count).toBe(1);
			expect(observer2.cb1count).toBe(1);
		});

	});

	describe("listening to two objects with the same event name", function(){
		
		beforeEach(function(){
			observer1.cb1count = 0;
			publisher1.subscribe("onAction",observer1.callback1);
			publisher2.subscribe("onAction",observer1.callback1);
		});

		it("should call the callback on the observer object", function(){
			publisher1.publish("onAction");
			publisher2.publish("onAction");
			expect(observer1.cb1count).toBe(2);
		});

	});

	describe("parameters", function(){

		beforeEach(function(){
			observer1.cb1p1 = {};
			publisher1.subscribe("onAction",observer1.callback1);
		});
		
		it("should pass the params",function(){
			publisher1.publish("onAction",[2,3]);
			expect(observer1.cb1p1).toEqual(2);
			expect(observer1.cb1p2).toEqual(3);
		});

	});

});