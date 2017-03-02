#!/bin/bash

PROJECT_HOME=$(pwd)

function help {
	echo "Choose one of the following: {install|clean|run}"
	exit 1
}

function install {
	echo "Installing required packages"
	npm install &&
	echo "Installing required dependencies & tools"
  sudo apt-get install graphicsmagick &&
	sudo apt-get install imagemagick
}

function clean {
	echo "Cleaning the directory"
  cd $PROJECT_HOME
	rm -r -f *.png &&
  rm -r -f *.jpg &&
  rm -r -f *.jpeg &&
  rm -r -f *.gif &&
  rm -r -f *.svg &&
  rm -r -f drawable-xxxhdpi &&
  rm -r -f drawable-xxhdpi &&
  rm -r -f drawable-xhdpi &&
  rm -r -f drawable-hdpi &&
  rm -r -f drawable-mdpi
}

function run {
	echo "Launching the script"
  cd $PROJECT_HOME &&
	./image.js
}

if [ $# -eq 0 ]
then
	help
fi

for cmd in $@
do

case "$cmd" in

	install)
		install
	;;

	clean)
		clean
	;;

	run)
		run
	;;

	*)
		help
	;;
esac

done
