/**
 * Created by yuberdysheva on 31/05/2017.
 */

import $ from "jquery"
import "./styles.sass"

$(document).ready(() => {
    var playing = true;

    function createGrid(rows, cols){
        var grid = [];
        for(var i = 0; i < rows; i++){
            grid.push([]);
            for(var j = 0; j < cols; j++){
                var num = Math.random();
                if (num < 0.33) {
                    grid[i].push(1);
                } else {
                    grid[i].push(0);
                }
            }
        }
        return grid;
    }

    function draw(grid){
        $("#tab").empty();
        for(var i = 0; i < grid.length; i++){
            $("#tab").append("<tr></tr>");
            for(var j = 0; j < grid[0].length; j++){
                var rows = $("tr");
                var td = $("<td></td>");
                var div = $("<div></div>");
                addHandler(grid, div, i, j);
                td.append(div);
                if(grid[i][j] === 0) {
                    div.addClass("lightOff");
                } else if(grid[i][j] === 1){
                    div.addClass("lightOn");
                }
                $(rows[i]).append(td);
            }
        }
        $("#play").click(function(){
            g = createGrid(5, 5);
            draw(g);
            playing = true;
            $("#alertMes").remove();
        });
    }

    function addHandler(grid, elem, row, col){
        elem.click(function(){
            if (!playing) {
                return;
            }
            //center
            if (grid[row][col] === 0){
                grid[row][col] = 1;
            } else if (grid[row][col] == 1){
                grid[row][col] = 0;
            }
            //top
            if (row > 0){
                if (grid[row - 1][col] === 0){
                    grid[row - 1][col] = 1
                } else if(grid[row - 1][col] === 1){
                    grid[row - 1][col] = 0;
                }
            }
            //bottom
            if (row < grid.length - 1){
                if (grid[row + 1][col] === 0){
                    grid[row + 1][col] = 1
                } else if(grid[row + 1][col] === 1){
                    grid[row + 1][col] = 0;
                }
            }
            //left
            if (col > 0){
                if (grid[row][col - 1] === 0){
                    grid[row][col - 1] = 1
                } else if(grid[row][col - 1] === 1){
                    grid[row][col - 1] = 0;
                }
            }
            //rigth
            if (col < grid[row].length - 1){
                if (grid[row][col + 1] === 0){
                    grid[row][col + 1] = 1
                } else if(grid[row][col + 1] === 1){
                    grid[row][col + 1] = 0;
                }
            }
            if (isWin(grid)) {
                playing = false;
                //alert("Congratulations! You have turn  all lights out!");
                alertMessage();
            }
            draw(grid);
        });
    }

    function isWin(grid){
        for (var i = 0; i < grid.length; i++){
            for (var j = 0; j < grid[0].length; j++){
                if (grid[i][j] === 1){
                    return false;
                }
            }
        }
        return true;
    }
    
    function alertMessage() {
        var div = $("<div></div>");
        div.attr("id", "alertMes");
        div.text("Congratulations! You have turned  all the lights out!");
        $("#container").append(div);
    }

    var g = createGrid(5, 5);
    draw(g);
});
