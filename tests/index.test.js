import {
  cleanBook,
  addBook,
  removeWrappedQuotes,
  titleParser,
  isIsbn,
  isDate,
  toYaml,
  sortByDate,
} from "../src/utils";
import book from "./fixture.json";

jest.mock("@actions/core");

const date = "2020-09-12";

it("cleanBook", () =>
  expect(
    cleanBook(
      {
        date,
        body: "I loved it!",
        bookIsbn: "0525658181",
      },

      book
    )
  ).toMatchInlineSnapshot(`
    Object {
      "authors": Array [
        "Yaa Gyasi",
      ],
      "canonicalVolumeLink": "https://books.google.com/books/about/Transcendent_Kingdom.html?hl=&id=ty19yQEACAAJ",
      "categories": Array [
        "Fiction",
      ],
      "dateFinished": "2020-09-12",
      "description": "\\"A novel about faith, science, religion, and family that tells the deeply moving portrait of a family of Ghanaian immigrants ravaged by depression and addiction and grief, narrated by a fifth year candidate in neuroscience at Stanford school of medicine studying the neural circuits of reward seeking behavior in mice\\"--",
      "imageLinks": Object {
        "smallThumbnail": "https://books.google.com/books/content?id=ty19yQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
        "thumbnail": "https://books.google.com/books/content?id=ty19yQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      },
      "industryIdentifiers": Array [
        Object {
          "identifier": "0525658181",
          "type": "ISBN_10",
        },
        Object {
          "identifier": "9780525658184",
          "type": "ISBN_13",
        },
      ],
      "isbn": "0525658181",
      "language": "en",
      "notes": "I loved it!",
      "pageCount": 288,
      "printType": "BOOK",
      "publishedDate": "2020",
      "title": "Transcendent Kingdom",
    }
  `));

it("addBook", async () =>
  expect(
    await addBook(
      {
        date,
        body: "Amazing!",
        bookIsbn: "0525658181",
      },

      book,
      "_data/read.yml"
    )
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "authors": Array [
          "Raven Leilani",
        ],
        "canonicalVolumeLink": "https://books.google.com/books/about/Luster.html?hl=&id=eJ06zQEACAAJ",
        "dateFinished": "2020-09-06",
        "description": "Sharp, comic, disruptive, tender, Raven Leilani's debut novel, Luster, sees a young black woman fall into art and someone else's open marriage. Edie is stumbling her way through her twenties--sharing a subpar apartment in Bushwick, clocking in and out of her admin job, making a series of inappropriate sexual choices. She's also, secretly, haltingly, figuring her way into life as an artist. And then she meets Eric, a digital archivist with a family in New Jersey, including an autopsist wife who has agreed to an open marriage--with rules. As if navigating the constantly shifting landscapes of contemporary sexual manners and racial politics weren't hard enough, Edie finds herself unemployed and falling into Eric's family life, his home. She becomes a hesitant friend to his wife and a de facto role model to his adopted daughter. Edie is the only black woman who young Akila knows. Razor sharp, darkly comic, sexually charged, socially disruptive, Luster is a portrait of a young woman trying to make her sense of her life in a tumultuous era. It is also a haunting, aching description of how hard it is to believe in your own talent and the unexpected influences that bring us into ourselves along the way.",
        "imageLinks": Object {
          "smallThumbnail": "http://books.google.com/books/content?id=eJ06zQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=eJ06zQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        },
        "industryIdentifiers": Array [
          Object {
            "identifier": "0385696000",
            "type": "ISBN_10",
          },
          Object {
            "identifier": "9780385696005",
            "type": "ISBN_13",
          },
        ],
        "language": "en",
        "pageCount": 240,
        "printType": "BOOK",
        "publishedDate": "2020-08-04",
        "title": "Luster",
      },
      Object {
        "authors": Array [
          "Yaa Gyasi",
        ],
        "canonicalVolumeLink": "https://books.google.com/books/about/Transcendent_Kingdom.html?hl=&id=ty19yQEACAAJ",
        "categories": Array [
          "Fiction",
        ],
        "dateFinished": "2020-09-12",
        "description": "\\"A novel about faith, science, religion, and family that tells the deeply moving portrait of a family of Ghanaian immigrants ravaged by depression and addiction and grief, narrated by a fifth year candidate in neuroscience at Stanford school of medicine studying the neural circuits of reward seeking behavior in mice\\"--",
        "imageLinks": Object {
          "smallThumbnail": "https://books.google.com/books/content?id=ty19yQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
          "thumbnail": "https://books.google.com/books/content?id=ty19yQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        },
        "industryIdentifiers": Array [
          Object {
            "identifier": "0525658181",
            "type": "ISBN_10",
          },
          Object {
            "identifier": "9780525658184",
            "type": "ISBN_13",
          },
        ],
        "isbn": "0525658181",
        "language": "en",
        "notes": "Amazing!",
        "pageCount": 288,
        "printType": "BOOK",
        "publishedDate": "2020",
        "title": "Transcendent Kingdom",
      },
      Object {
        "authors": Array [
          "Anna Wiener",
        ],
        "canonicalVolumeLink": "https://play.google.com/store/books/details?id=5fqTDwAAQBAJ",
        "categories": Array [
          "Biography & Autobiography",
        ],
        "dateFinished": "2020-11-22",
        "description": "One of Vogue's 22 Books to Read This Winter \\"A definitive document of a world in transition: I won't be alone in returning to Uncanny Valley for clarity and consolation for many years to come.\\" —Jia Tolentino, author of Trick Mirror: Reflections on Self-Delusion The prescient, page-turning account of a journey in Silicon Valley: a defining memoir of our digital age In her mid-twenties, at the height of tech industry idealism, Anna Wiener—stuck, broke, and looking for meaning in her work, like any good millennial--left a job in book publishing for the promise of the new digital economy. She moved from New York to San Francisco, where she landed at a big-data startup in the heart of the Silicon Valley bubble: a world of surreal extravagance, dubious success, and fresh-faced entrepreneurs hell-bent on domination, glory, and, of course, progress. Anna arrived amidst a massive cultural shift, as the tech industry rapidly transformed into a locus of wealth and power rivaling Wall Street. But amid the company ski vacations and in-office speakeasies, boyish camaraderie and ride-or-die corporate fealty, a new Silicon Valley began to emerge: one in far over its head, one that enriched itself at the expense of the idyllic future it claimed to be building. Part coming-age-story, part portrait of an already-bygone era, Anna Wiener’s memoir is a rare first-person glimpse into high-flying, reckless startup culture at a time of unchecked ambition, unregulated surveillance, wild fortune, and accelerating political power. With wit, candor, and heart, Anna deftly charts the tech industry’s shift from self-appointed world savior to democracy-endangering liability, alongside a personal narrative of aspiration, ambivalence, and disillusionment. Unsparing and incisive, Uncanny Valley is a cautionary tale, and a revelatory interrogation of a world reckoning with consequences its unwitting designers are only beginning to understand.",
        "imageLinks": Object {
          "smallThumbnail": "http://books.google.com/books/content?id=5fqTDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=5fqTDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        "industryIdentifiers": Array [
          Object {
            "identifier": "9780374719760",
            "type": "ISBN_13",
          },
          Object {
            "identifier": "0374719764",
            "type": "ISBN_10",
          },
        ],
        "isbn": "9780374719760",
        "language": "en",
        "pageCount": 288,
        "printType": "BOOK",
        "publishedDate": "2020-01-14",
        "title": "Uncanny Valley",
      },
      Object {
        "authors": Array [
          "Kimberly Drew",
          "Jenna Wortham",
        ],
        "canonicalVolumeLink": "https://play.google.com/store/books/details?id=pUGGDwAAQBAJ",
        "categories": Array [
          "Social Science",
        ],
        "dateFinished": "2021-01-10",
        "description": "NEW YORK TIMES EDITORS’ CHOICE • An archive of collective memory and exuberant testimony A luminous map to navigate an opaque and disorienting present An infinite geography of possible futures What does it mean to be Black and alive right now? Kimberly Drew and Jenna Wortham have brought together this collection of work—images, photos, essays, memes, dialogues, recipes, tweets, poetry, and more—to tell the story of the radical, imaginative, provocative, and gorgeous world that Black creators are bringing forth today. The book presents a succession of startling and beautiful pieces that generate an entrancing rhythm: Readers will go from conversations with activists and academics to memes and Instagram posts, from powerful essays to dazzling paintings and insightful infographics. In answering the question of what it means to be Black and alive, Black Futures opens a prismatic vision of possibility for every reader.",
        "imageLinks": Object {
          "smallThumbnail": "http://books.google.com/books/content?id=pUGGDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=pUGGDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        "industryIdentifiers": Array [
          Object {
            "identifier": "9780399181146",
            "type": "ISBN_13",
          },
          Object {
            "identifier": "0399181148",
            "type": "ISBN_10",
          },
        ],
        "isbn": "9780399181146",
        "language": "en",
        "pageCount": 544,
        "printType": "BOOK",
        "publishedDate": "2020-12-01",
        "title": "Black Futures",
      },
      Object {
        "authors": Array [
          "Silvia Moreno-Garcia",
        ],
        "canonicalVolumeLink": "https://play.google.com/store/books/details?id=ksKyDwAAQBAJ",
        "categories": Array [
          "Fiction",
        ],
        "dateFinished": "2021-09-26",
        "description": "NEW YORK TIMES BESTSELLER • “It’s Lovecraft meets the Brontës in Latin America, and after a slow-burn start Mexican Gothic gets seriously weird.”—The Guardian IN DEVELOPMENT AS A HULU ORIGINAL LIMITED SERIES PRODUCED BY KELLY RIPA AND MARK CONSUELOS • FINALIST FOR THE LOCUS AWARD • NOMINATED FOR THE BRAM STOKER AWARD • NAMED ONE OF THE BEST BOOKS OF THE YEAR BY The New Yorker • Vanity Fair • NPR • The Washington Post • Tordotcom • Marie Claire • Vox • Mashable • Men’s Health • Library Journal • Book Riot • LibraryReads An isolated mansion. A chillingly charismatic aristocrat. And a brave socialite drawn to expose their treacherous secrets. . . . From the author of Gods of Jade and Shadow comes “a terrifying twist on classic gothic horror” (Kirkus Reviews) set in glamorous 1950s Mexico. After receiving a frantic letter from her newly-wed cousin begging for someone to save her from a mysterious doom, Noemí Taboada heads to High Place, a distant house in the Mexican countryside. She’s not sure what she will find—her cousin’s husband, a handsome Englishman, is a stranger, and Noemí knows little about the region. Noemí is also an unlikely rescuer: She’s a glamorous debutante, and her chic gowns and perfect red lipstick are more suited for cocktail parties than amateur sleuthing. But she’s also tough and smart, with an indomitable will, and she is not afraid: Not of her cousin’s new husband, who is both menacing and alluring; not of his father, the ancient patriarch who seems to be fascinated by Noemí; and not even of the house itself, which begins to invade Noemi’s dreams with visions of blood and doom. Her only ally in this inhospitable abode is the family’s youngest son. Shy and gentle, he seems to want to help Noemí, but might also be hiding dark knowledge of his family’s past. For there are many secrets behind the walls of High Place. The family’s once colossal wealth and faded mining empire kept them from prying eyes, but as Noemí digs deeper she unearths stories of violence and madness. And Noemí, mesmerized by the terrifying yet seductive world of High Place, may soon find it impossible to ever leave this enigmatic house behind. “It’s as if a supernatural power compels us to turn the pages of the gripping Mexican Gothic.”—The Washington Post “Mexican Gothic is the perfect summer horror read, and marks Moreno-Garcia with her hypnotic and engaging prose as one of the genre’s most exciting talents.”—Nerdist “A period thriller as rich in suspense as it is in lush ’50s atmosphere.”—Entertainment Weekly",
        "imageLinks": Object {
          "smallThumbnail": "https://books.google.com/books/content?id=ksKyDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "https://books.google.com/books/content?id=ksKyDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        "industryIdentifiers": Array [
          Object {
            "identifier": "9780525620792",
            "type": "ISBN_13",
          },
          Object {
            "identifier": "0525620796",
            "type": "ISBN_10",
          },
        ],
        "isbn": "9780525620792",
        "language": "en",
        "pageCount": 320,
        "printType": "BOOK",
        "publishedDate": "2020-06-30",
        "title": "Mexican Gothic",
      },
      Object {
        "authors": Array [
          "bell hooks",
        ],
        "canonicalVolumeLink": "https://play.google.com/store/books/details?id=f2_fBQAAQBAJ",
        "categories": Array [
          "Social Science",
        ],
        "dateFinished": "2022-01-13",
        "description": "A classic work of feminist scholarship, Ain't I a Woman has become a must-read for all those interested in the nature of black womanhood. Examining the impact of sexism on black women during slavery, the devaluation of black womanhood, black male sexism, racism among feminists, and the black woman's involvement with feminism, hooks attempts to move us beyond racist and sexist assumptions. The result is nothing short of groundbreaking, giving this book a critical place on every feminist scholar's bookshelf.",
        "imageLinks": Object {
          "smallThumbnail": "https://books.google.com/books/content?id=f2_fBQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "https://books.google.com/books/content?id=f2_fBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        "industryIdentifiers": Array [
          Object {
            "identifier": "9781317588610",
            "type": "ISBN_13",
          },
          Object {
            "identifier": "1317588614",
            "type": "ISBN_10",
          },
        ],
        "isbn": "9781317588610",
        "language": "en",
        "pageCount": 206,
        "printType": "BOOK",
        "publishedDate": "2014-12-17",
        "title": "Ain't I a Woman",
      },
    ]
  `));

it("toYaml", async () =>
  expect(
    toYaml(
      await addBook(
        {
          date,
          body: "Amazing!",
          bookIsbn: "0525658181",
        },

        book,
        "_data/read.yml"
      )
    )
  ).toMatchInlineSnapshot(`
    "
      - dateFinished: \\"2020-09-06\\"
        title: \\"Luster\\"
        authors:
          - \\"Raven Leilani\\"
        publishedDate: \\"2020-08-04\\"
        description: \\"Sharp, comic, disruptive, tender, Raven Leilani's debut novel, Luster, sees a young black woman fall into art and someone else's open marriage. Edie is stumbling her way through her twenties--sharing a subpar apartment in Bushwick, clocking in and out of her admin job, making a series of inappropriate sexual choices. She's also, secretly, haltingly, figuring her way into life as an artist. And then she meets Eric, a digital archivist with a family in New Jersey, including an autopsist wife who has agreed to an open marriage--with rules. As if navigating the constantly shifting landscapes of contemporary sexual manners and racial politics weren't hard enough, Edie finds herself unemployed and falling into Eric's family life, his home. She becomes a hesitant friend to his wife and a de facto role model to his adopted daughter. Edie is the only black woman who young Akila knows. Razor sharp, darkly comic, sexually charged, socially disruptive, Luster is a portrait of a young woman trying to make her sense of her life in a tumultuous era. It is also a haunting, aching description of how hard it is to believe in your own talent and the unexpected influences that bring us into ourselves along the way.\\"
        industryIdentifiers:
          - type: \\"ISBN_10\\"
            identifier: \\"0385696000\\"
          - type: \\"ISBN_13\\"
            identifier: \\"9780385696005\\"
        pageCount: 240
        printType: \\"BOOK\\"
        imageLinks:
          smallThumbnail: \\"http://books.google.com/books/content?id=eJ06zQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api\\"
          thumbnail: \\"http://books.google.com/books/content?id=eJ06zQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api\\"
        language: \\"en\\"
        canonicalVolumeLink: \\"https://books.google.com/books/about/Luster.html?hl=&id=eJ06zQEACAAJ\\"
      - isbn: \\"0525658181\\"
        dateFinished: \\"2020-09-12\\"
        notes: \\"Amazing!\\"
        title: \\"Transcendent Kingdom\\"
        authors:
          - \\"Yaa Gyasi\\"
        publishedDate: \\"2020\\"
        description: \\"\\\\\\"A novel about faith, science, religion, and family that tells the deeply moving portrait of a family of Ghanaian immigrants ravaged by depression and addiction and grief, narrated by a fifth year candidate in neuroscience at Stanford school of medicine studying the neural circuits of reward seeking behavior in mice\\\\\\"--\\"
        industryIdentifiers:
          - type: \\"ISBN_10\\"
            identifier: \\"0525658181\\"
          - type: \\"ISBN_13\\"
            identifier: \\"9780525658184\\"
        pageCount: 288
        printType: \\"BOOK\\"
        categories:
          - \\"Fiction\\"
        imageLinks:
          smallThumbnail: \\"https://books.google.com/books/content?id=ty19yQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api\\"
          thumbnail: \\"https://books.google.com/books/content?id=ty19yQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api\\"
        language: \\"en\\"
        canonicalVolumeLink: \\"https://books.google.com/books/about/Transcendent_Kingdom.html?hl=&id=ty19yQEACAAJ\\"
      - isbn: \\"9780374719760\\"
        dateFinished: \\"2020-11-22\\"
        title: \\"Uncanny Valley\\"
        authors:
          - \\"Anna Wiener\\"
        publishedDate: \\"2020-01-14\\"
        description: \\"One of Vogue's 22 Books to Read This Winter \\\\\\"A definitive document of a world in transition: I won't be alone in returning to Uncanny Valley for clarity and consolation for many years to come.\\\\\\" —Jia Tolentino, author of Trick Mirror: Reflections on Self-Delusion The prescient, page-turning account of a journey in Silicon Valley: a defining memoir of our digital age In her mid-twenties, at the height of tech industry idealism, Anna Wiener—stuck, broke, and looking for meaning in her work, like any good millennial--left a job in book publishing for the promise of the new digital economy. She moved from New York to San Francisco, where she landed at a big-data startup in the heart of the Silicon Valley bubble: a world of surreal extravagance, dubious success, and fresh-faced entrepreneurs hell-bent on domination, glory, and, of course, progress. Anna arrived amidst a massive cultural shift, as the tech industry rapidly transformed into a locus of wealth and power rivaling Wall Street. But amid the company ski vacations and in-office speakeasies, boyish camaraderie and ride-or-die corporate fealty, a new Silicon Valley began to emerge: one in far over its head, one that enriched itself at the expense of the idyllic future it claimed to be building. Part coming-age-story, part portrait of an already-bygone era, Anna Wiener’s memoir is a rare first-person glimpse into high-flying, reckless startup culture at a time of unchecked ambition, unregulated surveillance, wild fortune, and accelerating political power. With wit, candor, and heart, Anna deftly charts the tech industry’s shift from self-appointed world savior to democracy-endangering liability, alongside a personal narrative of aspiration, ambivalence, and disillusionment. Unsparing and incisive, Uncanny Valley is a cautionary tale, and a revelatory interrogation of a world reckoning with consequences its unwitting designers are only beginning to understand.\\"
        industryIdentifiers:
          - type: \\"ISBN_13\\"
            identifier: \\"9780374719760\\"
          - type: \\"ISBN_10\\"
            identifier: \\"0374719764\\"
        pageCount: 288
        printType: \\"BOOK\\"
        categories:
          - \\"Biography & Autobiography\\"
        imageLinks:
          smallThumbnail: \\"http://books.google.com/books/content?id=5fqTDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\\"
          thumbnail: \\"http://books.google.com/books/content?id=5fqTDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\\"
        language: \\"en\\"
        canonicalVolumeLink: \\"https://play.google.com/store/books/details?id=5fqTDwAAQBAJ\\"
      - isbn: \\"9780399181146\\"
        dateFinished: \\"2021-01-10\\"
        title: \\"Black Futures\\"
        authors:
          - \\"Kimberly Drew\\"
          - \\"Jenna Wortham\\"
        publishedDate: \\"2020-12-01\\"
        description: \\"NEW YORK TIMES EDITORS’ CHOICE • An archive of collective memory and exuberant testimony A luminous map to navigate an opaque and disorienting present An infinite geography of possible futures What does it mean to be Black and alive right now? Kimberly Drew and Jenna Wortham have brought together this collection of work—images, photos, essays, memes, dialogues, recipes, tweets, poetry, and more—to tell the story of the radical, imaginative, provocative, and gorgeous world that Black creators are bringing forth today. The book presents a succession of startling and beautiful pieces that generate an entrancing rhythm: Readers will go from conversations with activists and academics to memes and Instagram posts, from powerful essays to dazzling paintings and insightful infographics. In answering the question of what it means to be Black and alive, Black Futures opens a prismatic vision of possibility for every reader.\\"
        industryIdentifiers:
          - type: \\"ISBN_13\\"
            identifier: \\"9780399181146\\"
          - type: \\"ISBN_10\\"
            identifier: \\"0399181148\\"
        pageCount: 544
        printType: \\"BOOK\\"
        categories:
          - \\"Social Science\\"
        imageLinks:
          smallThumbnail: \\"http://books.google.com/books/content?id=pUGGDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\\"
          thumbnail: \\"http://books.google.com/books/content?id=pUGGDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\\"
        language: \\"en\\"
        canonicalVolumeLink: \\"https://play.google.com/store/books/details?id=pUGGDwAAQBAJ\\"
      - isbn: \\"9780525620792\\"
        dateFinished: \\"2021-09-26\\"
        title: \\"Mexican Gothic\\"
        authors:
          - \\"Silvia Moreno-Garcia\\"
        publishedDate: \\"2020-06-30\\"
        description: \\"NEW YORK TIMES BESTSELLER • “It’s Lovecraft meets the Brontës in Latin America, and after a slow-burn start Mexican Gothic gets seriously weird.”—The Guardian IN DEVELOPMENT AS A HULU ORIGINAL LIMITED SERIES PRODUCED BY KELLY RIPA AND MARK CONSUELOS • FINALIST FOR THE LOCUS AWARD • NOMINATED FOR THE BRAM STOKER AWARD • NAMED ONE OF THE BEST BOOKS OF THE YEAR BY The New Yorker • Vanity Fair • NPR • The Washington Post • Tordotcom • Marie Claire • Vox • Mashable • Men’s Health • Library Journal • Book Riot • LibraryReads An isolated mansion. A chillingly charismatic aristocrat. And a brave socialite drawn to expose their treacherous secrets. . . . From the author of Gods of Jade and Shadow comes “a terrifying twist on classic gothic horror” (Kirkus Reviews) set in glamorous 1950s Mexico. After receiving a frantic letter from her newly-wed cousin begging for someone to save her from a mysterious doom, Noemí Taboada heads to High Place, a distant house in the Mexican countryside. She’s not sure what she will find—her cousin’s husband, a handsome Englishman, is a stranger, and Noemí knows little about the region. Noemí is also an unlikely rescuer: She’s a glamorous debutante, and her chic gowns and perfect red lipstick are more suited for cocktail parties than amateur sleuthing. But she’s also tough and smart, with an indomitable will, and she is not afraid: Not of her cousin’s new husband, who is both menacing and alluring; not of his father, the ancient patriarch who seems to be fascinated by Noemí; and not even of the house itself, which begins to invade Noemi’s dreams with visions of blood and doom. Her only ally in this inhospitable abode is the family’s youngest son. Shy and gentle, he seems to want to help Noemí, but might also be hiding dark knowledge of his family’s past. For there are many secrets behind the walls of High Place. The family’s once colossal wealth and faded mining empire kept them from prying eyes, but as Noemí digs deeper she unearths stories of violence and madness. And Noemí, mesmerized by the terrifying yet seductive world of High Place, may soon find it impossible to ever leave this enigmatic house behind. “It’s as if a supernatural power compels us to turn the pages of the gripping Mexican Gothic.”—The Washington Post “Mexican Gothic is the perfect summer horror read, and marks Moreno-Garcia with her hypnotic and engaging prose as one of the genre’s most exciting talents.”—Nerdist “A period thriller as rich in suspense as it is in lush ’50s atmosphere.”—Entertainment Weekly\\"
        industryIdentifiers:
          - type: \\"ISBN_13\\"
            identifier: \\"9780525620792\\"
          - type: \\"ISBN_10\\"
            identifier: \\"0525620796\\"
        pageCount: 320
        printType: \\"BOOK\\"
        categories:
          - \\"Fiction\\"
        imageLinks:
          smallThumbnail: \\"https://books.google.com/books/content?id=ksKyDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\\"
          thumbnail: \\"https://books.google.com/books/content?id=ksKyDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\\"
        language: \\"en\\"
        canonicalVolumeLink: \\"https://play.google.com/store/books/details?id=ksKyDwAAQBAJ\\"
      - isbn: \\"9781317588610\\"
        dateFinished: \\"2022-01-13\\"
        title: \\"Ain't I a Woman\\"
        authors:
          - \\"bell hooks\\"
        publishedDate: \\"2014-12-17\\"
        description: \\"A classic work of feminist scholarship, Ain't I a Woman has become a must-read for all those interested in the nature of black womanhood. Examining the impact of sexism on black women during slavery, the devaluation of black womanhood, black male sexism, racism among feminists, and the black woman's involvement with feminism, hooks attempts to move us beyond racist and sexist assumptions. The result is nothing short of groundbreaking, giving this book a critical place on every feminist scholar's bookshelf.\\"
        industryIdentifiers:
          - type: \\"ISBN_13\\"
            identifier: \\"9781317588610\\"
          - type: \\"ISBN_10\\"
            identifier: \\"1317588614\\"
        pageCount: 206
        printType: \\"BOOK\\"
        categories:
          - \\"Social Science\\"
        imageLinks:
          smallThumbnail: \\"https://books.google.com/books/content?id=f2_fBQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\\"
          thumbnail: \\"https://books.google.com/books/content?id=f2_fBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\\"
        language: \\"en\\"
        canonicalVolumeLink: \\"https://play.google.com/store/books/details?id=f2_fBQAAQBAJ\\"
    "
  `));

it("removeWrappedQuotes", () => {
  expect(removeWrappedQuotes("hello")).toBe("hello");
  expect(removeWrappedQuotes('"hello"')).toBe("hello");
  expect(removeWrappedQuotes('this says "hello".')).toBe('this says "hello".');
  expect(removeWrappedQuotes('"this part will get cut off"--')).toBe(
    "this part will get cut off…"
  );
});

it("titleParser", () => {
  const today = new Date().toISOString().slice(0, 10);
  expect(titleParser("1234567890")).toEqual({
    bookIsbn: "1234567890",
    date: today,
  });
  expect(titleParser("1234567890 ")).toEqual({
    bookIsbn: "1234567890",
    date: today,
  });
  expect(titleParser("1234567890123")).toEqual({
    bookIsbn: "1234567890123",
    date: today,
  });
  expect(titleParser("1234567890 2020-01-12")).toEqual({
    bookIsbn: "1234567890",
    date: "2020-01-12",
  });
  expect(titleParser("1234567890123 2020-01-12")).toEqual({
    bookIsbn: "1234567890123",
    date: "2020-01-12",
  });
  expect(titleParser("1234567890123 abcde")).toEqual({
    bookIsbn: "1234567890123",
    date: today,
  });
});

it("isDate", () => {
  expect(isDate("abcde")).toEqual(false);
  expect(isDate("2020-09-12")).toEqual(true);
  expect(isDate("2020")).toEqual(false);
});

it("isIsbn", () => {
  expect(isIsbn("1234567890")).toEqual(true);
  expect(isIsbn("1234567890123")).toEqual(true);
  expect(isIsbn("123456789012")).toEqual(false);
  expect(isIsbn("12345678901234")).toEqual(false);
  expect(isIsbn("1")).toEqual(false);
});

it("sortByDate", () => {
  expect(
    sortByDate([
      { dateFinished: "2020-01-01" },
      { dateFinished: "1900-01-01" },
      { dateFinished: "2020-11-01" },
    ])
  ).toEqual([
    { dateFinished: "1900-01-01" },
    { dateFinished: "2020-01-01" },
    { dateFinished: "2020-11-01" },
  ]);
});
