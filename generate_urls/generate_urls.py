#-*- coding: utf-8 -*-
import sqlite3
from jinja2 import Template

from emoji_alphabet import emojify

BASE_URL = 'https://emoji.xyz/a/'
BASE_DIR = '/tmp/emoji-xyz-static/'


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

conn = sqlite3.connect('db.sqlite3')
conn.row_factory = dict_factory
c = conn.cursor()
c.execute('SELECT * FROM urls ORDER BY id')
rows = c.fetchall()

for row in rows:
        with open('template.html.j2') as f:
            template  = Template(f.read())
            emoji     = emojify(row['id'])
            decoded   = emoji.encode('idna').decode('utf-8')
            filename1 = BASE_DIR + emoji
            filename2 = BASE_DIR + decoded
            link = row['url']
            output_text = template.render(link=link)
            f1 = open(filename1,"w")
            f1.write(output_text)
            f1.close()
            f2 = open(filename2,"w")
            f2.write(output_text)
            f2.close()
