window.onload="click()"
var direction="start";
var i=0;
var x=0;
var timer1=0;
var timer2=0;
var points=0;
var c=0;
var item=0;
var t=0;
var id=" ";
var q=0;
var yes=new Audio("yes.wav");
var n=3;
var m=0
var hard=0;
var bombs=3;
var diamonds=3;
var del=new Array(625);
var u=0;
var p=0;
var h=-1;

var element;
var element2;
var element3;

del[0]=1;

//poziom trudnosci
function myclick(d)
{
		if(d==3)
		{
			t=200;
			q=20;
			m=50;
			document.getElementById("b1").style.color="#064500";
			document.getElementById("b2").style.color="#064500";
			document.getElementById("b3").style.color="white";
			diamonds=4;
			hard=1;
			
		}
		else if(d==2)
		{
			t=350;
			q=10;
			m=70;
			document.getElementById("b1").style.color="#064500";
			document.getElementById("b2").style.color="white";
			document.getElementById("b3").style.color="#064500";
		}
		else
		{
			t=400;
			q=5;
			m=90;
			document.getElementById("b1").style.color="white";
			document.getElementById("b2").style.color="#064500";
			document.getElementById("b3").style.color="#064500";
		}
}

//kierunek ruchu

window.addEventListener('keydown', function(event) 
{
  switch (event.keyCode) 
  {
    case 37: // Left
      direction="left";
    break;
 
    case 38: // Up
      direction="up";
    break;
 
    case 39: // Right
      direction="right";
    break;
 
    case 40: // Down
      direction="down";
    break;
  }
}, false);

//mechanika

function game()
{
	
	if(direction=="start")
	{
		i=312;
		direction="right";
	}
	else
	{
		if(direction=="up")
		{
			i=i-25;
			
			if(i<0)
			{
				lose();
			}
		}
		if(direction=="down")
		{
			i=i+25;
			
			if(i>625)
			{
				lose();
			}
		}
		if(direction=="right")
		{
			if(i%25==0)
			{
				lose();
			}
			else
			{
				i=i+1;
			}
		}
		if(direction=="left")
		{
			if(i%25==1)
			{
				lose();
			}
			else
			{
				i=i-1;
			}
		}
	}
	
	if (u>624)
	{
		u=1;
	}
	else
	{
		u++;
		if(h>625)
		{
			h=0;
		}
		else
		{
			h++;
		}
	}
	del[u]=i;
	p=del[h]
	
	element="A"+i;
	element2="A"+p;
	element3=document.getElementById(element).textContent;
	
	
	//zliczanie punktów
	if(element3 !='')
	{
		if(element3=="  ")
		{
			lose();
		}
		else if(element3=="   ")
		{
			lose();
		}
		else
		{
			if(item==0) points=points+10;
			else points=points+100;
			
			document.getElementById("current").innerHTML=points;
			h=h-1;
			items();
		}
	}
	
	document.getElementById(element).style.background="#064500";
	document.getElementById(element).innerHTML="   ";
	
	document.getElementById(element2).style.background="#000000";
	document.getElementById(element2).innerHTML="";
	
	timer1=setTimeout("game()",t);
}

//koniec gry

function lose()
{
		clearTimeout(timer1);
		clearTimeout(timer2);
		var score=(points+c)
		document.getElementById("game").innerHTML='<h1>Game Over!</h1> <br/><h2>Your Score: '+score+'</h2> <span id="button" onclick="location.reload()">New Game</span>';
}

//itemy

function items()
{
	var rand=Math.floor(Math.random()*625)+1;
	var numer="A"+rand;
	var check =document.getElementById(numer).textContent;
	if(check=="")
	{
		var rand2=Math.floor(Math.random()*diamonds)+1;
		if(rand2==1)
		{
			document.getElementById(numer).innerHTML='<i class="icon-diamond"> </i>';
			item=1;
		}
		else
		{
			document.getElementById(numer).innerHTML='<i class="icon-apple"> </i>';
			item=0;
		}
	}
	else
	{
		items();
	}
}

function myclock()
	{
		c=c+1;
		document.getElementById("time").innerHTML=c;
		if(c%10==0)
		{
			if(t>m)
			{				
				t=(t-q);
			}
		}
		timer2=setTimeout("myclock()",1000);
	}


//stworzenie planszy
function start()
{
		var contents="";
		for(i=0;i<625;i++)
		{	
			x=i+1;
			if(i%25==0) contents=contents+'<div id="A'+x+'" class="case" style="clear:both;" ></div>';
			else contents=contents+'<div id="A'+x+'" class="case" ></div>';
		}
		document.getElementById("game").innerHTML=contents;
		if (hard==1) bomb();
		game();
		items();
		myclock();
}

//odliczanie
		
function count()
	{
		if(t==0)
		{
			yes.play();
		}
		else
		{
			document.getElementById("game").innerHTML='<div id="ready">'+n+'</div>'
			if(n>0)
			{
				setTimeout("count()",1000);
			}
			else
			{				
				start();
			}
			n--;
		}
	}
	
function bomb()
{
	var rand=Math.floor(Math.random()*625)+1;
	var numer="A"+rand;
	if(numer !=311)
	{
		document.getElementById(numer).innerHTML='<i class="icon-bomb" style="color:white">  </i>';
		bombs--;
		if(bombs !=0)
		{
			bomb();
		}
	}
	else
	{
		bomb();
	}
}