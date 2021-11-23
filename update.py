import os


def update():
    print('--- git pull')
    os.system('git pull')

    print('--- building go project')
    os.system('go build -o site cmd/web/*.go')

    print('--- restarting supervisor')
    os.system('sudo supervisorctl restart site')


if __name__ == '__main__':
    update()
