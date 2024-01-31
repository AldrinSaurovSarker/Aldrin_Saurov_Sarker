@echo off
start cmd /k "cd api & npm start"
cd ui
cd ReactPortfolio
start cmd /k "call workon test & cd api & flask run"
npm start
