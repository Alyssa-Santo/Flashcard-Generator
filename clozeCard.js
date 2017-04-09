//Create ClozeCard constructor object
var fs = require('fs');

module.exports = ClozeCard;

function ClozeCard(text, cloze){
//Make text an array
	this.text = text;
	this.cloze = cloze;
	this.partial = text.replace(cloze, "...");
	

	this.add = function(){
		var card = {
			text: this.text,
			cloze: this.cloze,
			partial: this.partial,
			type: "cloze",

		};

		fs.appendFile("allcards.txt", JSON.stringify(card) + ';', "utf8", function(error){
			if (error){
				console.log(error);
			};

		})

	};

}