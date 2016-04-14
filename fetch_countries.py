#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# ATTENTION!
# Pyquery is required (because I'm too lazy to write this without external libs)
#

from __future__ import unicode_literals

import re
import json

from pyquery import PyQuery as pq


dom = pq(url='http://www.worldstandards.eu/cars/list-of-left-driving-countries/')

side_re = re.compile(r'(right|left)')

countries = {tr[0].text: side_re.search(tr[1].text).group(1) for tr in dom('table').find('tr')
             if not tr[0].text.startswith('Country')}

with open('countries.json', 'w') as f:
    json.dump(countries, f, indent=4)
