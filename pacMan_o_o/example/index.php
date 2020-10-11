<?php

/*
 
        @package    Pleisterman\Tutorials\PacMan_O_O

        file:       index.php
        function:   this landing page for the Pleisterman Tutorial:
                    Pac Man O.O. Web example    

        author:     Rob Wolters
        company:    Pleisterman
        email:      info@pleisterman.nl
        liscence:   GNU GENERAL PUBLIC LICENSE Version 3

        Last revision: 03-10-2020
 
*/    

?>

<!DOCTYPE html>
<html lang='nl'>
    <head>

        <title>Pac Man Example</title>

        <link id="favicon" href="../common/assets/images//logo.png?version=0.001" rel="shortcut icon">
        <meta name="web_author" content="Pleisterman">
        <meta name="description" content="Javascript tutorials landing pageL Pac Man Web Example">
        <meta name="keywords" content="Javascript, tutorial, Object Oriented">
        <meta name="reply-to" content="info@pleisterman.nl">
        <meta name="copyright" content="pleisterman">

        <link rel="stylesheet" href="../common/css/style.css">
        <link rel="stylesheet" href="./css/style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="../common/js/jsProjectMinimized.js" charset="utf-8"></script>
        <script src="./js/app.js" charset="utf-8"></script>
        <script src="../common/js/getUniqueIndexModule.js" charset="utf-8"></script>
        <script src="../common/js/uiEventsModule.js" charset="utf-8"></script>
        <script src="../common/js/menuModule.js" charset="utf-8"></script>
        <script src="./js/game.js" charset="utf-8"></script>
        <script src="./js/nextLessonLinkModule.js" charset="utf-8"></script>
        
    </head>
    <body>

        <div class="content">
            <div class="grid"></div>
             <div class="score">
                <h3>Score:<span id="score"></span></h3>
             </div>
        </div>
        
    </body>
    
</html>