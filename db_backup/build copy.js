const s = require('shelljs');

s.rm('-rf', 'build');
s.mkdir('build');
s.cp('-R', 'public', 'build/public');
s.mkdir('-p', 'build/server/swagger');
s.cp('server/swagger/Api.yaml', 'build/server/swagger/Api.yaml');
