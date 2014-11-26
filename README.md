sandclock.js
============

Just a simple svg sandclock, made with d3.js.


## demo
Take a look at this plunker to see the sandlock: [plunker][sandclock]

[sandclock]: http://plnkr.co/edit/fFIqrTSQbh3JVetX7I8F?p=preview

## 30s look
```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<!--add stylesheets for the sandclock-->
	<link rel="stylesheet" href="sandclock.css">
	
	<!--add reference-->
	<script src="sandclock.js"></script>
	<!--you also need to reference d3-->
	<script src="d3.min.js"></script>
</head>
<body>
  <svg class=".sandclock"></svg>
	<script>
	  sandclock(".sandclock")
        .width(150)
        .height(280)
        .progress(0.5)
        .render();
	</script>
</body>
</html>
```

[ntw]: https://github.com/Phisherman/numbertoword/blob/master/de/numbertoword.js


## License

MIT License
