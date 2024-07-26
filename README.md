# Demos

1. pip install code2prompt
2. git clone https://github.com/linum-uqam/sbh-assistant.git; cd sbh-assistant/   
3. git submodule update --init --recursive 
4. Delete neuroglancer, we dont need it.
4. code2prompt --path . --exclude "**.svg,*package-lock*" --output ../project_summary.md