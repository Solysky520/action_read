import { read } from "../index";
import * as github from "@actions/github";
import * as core from "@actions/core";
import returnWriteFile from "../write-file";
import { promises } from "fs";

jest.mock("@actions/core");
jest.mock("../write-file");

describe("workflow", () => {
  test("want to read", async () => {
    jest.spyOn(promises, "readFile").mockResolvedValue();
    jest.useFakeTimers().setSystemTime(new Date("2022-10-01T12:00:00"));

    const exportVariableSpy = jest.spyOn(core, "exportVariable");
    const setFailedSpy = jest.spyOn(core, "setFailed");
    jest
      .spyOn(core, "getInput")
      .mockImplementationOnce(() => "my-library.json");
    jest
      .spyOn(core, "getInput")
      .mockImplementation((v) => (v === "timeZone" ? "America/New_York" : ""));
    Object.defineProperty(github, "context", {
      value: {
        payload: {
          inputs: {
            bookIsbn: "9780385696005",
          },
        },
      },
    });
    await read();
    expect(exportVariableSpy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "BookStatus",
          "want to read",
        ],
        [
          "NumberOfBooks",
          1,
        ],
        [
          "BookTitle-0",
          "Luster",
        ],
        [
          "BookThumbOutput-0",
          "book-9780385696005.png",
        ],
        [
          "BookThumb-0",
          "https://books.google.com/books/content?id=NFeTEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        ],
      ]
    `);
    expect(setFailedSpy).not.toHaveBeenCalled();
    expect(returnWriteFile.mock.calls[0]).toMatchInlineSnapshot(`
      [
        "my-library.json",
        [
          {
            "authors": [
              "Raven Leilani",
            ],
            "categories": [
              "Fiction",
            ],
            "dateAdded": "2022-10-01",
            "dateFinished": undefined,
            "dateStarted": undefined,
            "description": "NEW YORK TIMES BESTSELLER Winner of the 2020 Center for Fiction First Novel Prize Winner of the 2020 National Book Critics Circle's John Leonard Prize for Best First Book Winner of the 2020 Kirkus Prize for Fiction Winner of the 2021 Dylan Thomas Prize Finalist for the 2021 PEN/Hemingway Award for Best First Novel Longlisted for the 2021 Andrew Carnegie Medal for Excellence in Fiction Longlisted for the 2021 PEN/Jean Stein Book Award Longlisted for the 2021 Women's Prize for Fiction A New York Times Notable Book of the Year Named Best Book of the Year by O: the Oprah Magazine, Vanity Fair, Los Angeles Times, Town and Country, Amazon, Indigo, NPR, Harper’s Bazaar, Kirkus Reviews, Marie Claire, Good Housekeeping Sharp, comic, disruptive, and tender, Luster sees a young Black woman fall into art and someone else's open marriage. Edie is stumbling her way through her twenties—sharing a subpar apartment in Bushwick, clocking in and out of her admin job, making a series of inappropriate sexual choices. She's also, secretly, haltingly, figuring her way into life as an artist. And then she meets Eric, a digital archivist with a family in New Jersey, including an autopsist wife who has agreed to an open marriage—with rules. As if navigating the constantly shifting landscapes of contemporary sexual manners and racial politics weren't hard enough, Edie finds herself unemployed and falling into Eric's family life, his home. She becomes a hesitant friend to his wife and a de facto role model to his adopted daughter. Edie is the only Black woman who young Akila knows. Razor-sharp, darkly comic, sexually charged, socially disruptive, Luster is a portrait of a young woman trying to make sense of her life in a tumultuous era. It is also a haunting, aching description of how hard it is to believe in your own talent and the unexpected influences that bring us into ourselves along the way.",
            "isbn": "9780385696005",
            "language": "en",
            "link": "https://books.google.com/books/about/Luster.html?hl=&id=NFeTEAAAQBAJ",
            "pageCount": 0,
            "printType": "BOOK",
            "publishedDate": "2020-08-04",
            "status": "want to read",
            "thumbnail": "https://books.google.com/books/content?id=NFeTEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "title": "Luster",
          },
        ],
      ]
    `);
  });

  test("added to started", async () => {
    jest.spyOn(promises, "readFile").mockResolvedValue(
      JSON.stringify([
        {
          authors: ["Raven Leilani"],
          dateAdded: "2022-10-01",
          dateFinished: undefined,
          dateStarted: undefined,
          description:
            "Sharp, comic, disruptive, tender, Raven Leilani's debut novel, Luster, sees a young black woman fall into art and someone else's open marriage. Edie is stumbling her way through her twenties--sharing a subpar apartment in Bushwick, clocking in and out of her admin job, making a series of inappropriate sexual choices. She's also, secretly, haltingly, figuring her way into life as an artist. And then she meets Eric, a digital archivist with a family in New Jersey, including an autopsist wife who has agreed to an open marriage--with rules. As if navigating the constantly shifting landscapes of contemporary sexual manners and racial politics weren't hard enough, Edie finds herself unemployed and falling into Eric's family life, his home. She becomes a hesitant friend to his wife and a de facto role model to his adopted daughter. Edie is the only black woman who young Akila knows. Razor sharp, darkly comic, sexually charged, socially disruptive, Luster is a portrait of a young woman trying to make her sense of her life in a tumultuous era. It is also a haunting, aching description of how hard it is to believe in your own talent and the unexpected influences that bring us into ourselves along the way.",
          isbn: "9780385696005",
          language: "en",
          link: "https://books.google.com/books/about/Luster.html?hl=&id=eJ06zQEACAAJ",
          pageCount: 240,
          printType: "BOOK",
          publishedDate: "2020-08-04",
          status: "want to read",
          thumbnail:
            "https://books.google.com/books/content?id=eJ06zQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          title: "Luster",
        },
      ])
    );
    const exportVariableSpy = jest.spyOn(core, "exportVariable");
    const setFailedSpy = jest.spyOn(core, "setFailed");
    jest
      .spyOn(core, "getInput")
      .mockImplementationOnce(() => "my-library.json");
    Object.defineProperty(github, "context", {
      value: {
        payload: {
          inputs: {
            bookIsbn: "9780385696005",
            dateStarted: "2022-10-02",
          },
        },
      },
    });
    await read();
    expect(exportVariableSpy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "BookStatus",
          "started",
        ],
        [
          "NumberOfBooks",
          1,
        ],
        [
          "BookTitle",
          "Luster",
        ],
      ]
    `);
    expect(setFailedSpy).not.toHaveBeenCalled();
    expect(returnWriteFile.mock.calls[0]).toMatchInlineSnapshot(`
      [
        "my-library.json",
        [
          {
            "authors": [
              "Raven Leilani",
            ],
            "dateAdded": "2022-10-01",
            "dateFinished": undefined,
            "dateStarted": "2022-10-02",
            "description": "Sharp, comic, disruptive, tender, Raven Leilani's debut novel, Luster, sees a young black woman fall into art and someone else's open marriage. Edie is stumbling her way through her twenties--sharing a subpar apartment in Bushwick, clocking in and out of her admin job, making a series of inappropriate sexual choices. She's also, secretly, haltingly, figuring her way into life as an artist. And then she meets Eric, a digital archivist with a family in New Jersey, including an autopsist wife who has agreed to an open marriage--with rules. As if navigating the constantly shifting landscapes of contemporary sexual manners and racial politics weren't hard enough, Edie finds herself unemployed and falling into Eric's family life, his home. She becomes a hesitant friend to his wife and a de facto role model to his adopted daughter. Edie is the only black woman who young Akila knows. Razor sharp, darkly comic, sexually charged, socially disruptive, Luster is a portrait of a young woman trying to make her sense of her life in a tumultuous era. It is also a haunting, aching description of how hard it is to believe in your own talent and the unexpected influences that bring us into ourselves along the way.",
            "isbn": "9780385696005",
            "language": "en",
            "link": "https://books.google.com/books/about/Luster.html?hl=&id=eJ06zQEACAAJ",
            "pageCount": 240,
            "printType": "BOOK",
            "publishedDate": "2020-08-04",
            "status": "started",
            "thumbnail": "https://books.google.com/books/content?id=eJ06zQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "title": "Luster",
          },
        ],
      ]
    `);
  });

  test("started to finished", async () => {
    jest.spyOn(promises, "readFile").mockResolvedValue(
      JSON.stringify([
        {
          authors: ["Raven Leilani"],
          dateAdded: "2022-10-01",
          dateFinished: undefined,
          dateStarted: "2022-10-02",
          description:
            "Sharp, comic, disruptive, tender, Raven Leilani's debut novel, Luster, sees a young black woman fall into art and someone else's open marriage. Edie is stumbling her way through her twenties--sharing a subpar apartment in Bushwick, clocking in and out of her admin job, making a series of inappropriate sexual choices. She's also, secretly, haltingly, figuring her way into life as an artist. And then she meets Eric, a digital archivist with a family in New Jersey, including an autopsist wife who has agreed to an open marriage--with rules. As if navigating the constantly shifting landscapes of contemporary sexual manners and racial politics weren't hard enough, Edie finds herself unemployed and falling into Eric's family life, his home. She becomes a hesitant friend to his wife and a de facto role model to his adopted daughter. Edie is the only black woman who young Akila knows. Razor sharp, darkly comic, sexually charged, socially disruptive, Luster is a portrait of a young woman trying to make her sense of her life in a tumultuous era. It is also a haunting, aching description of how hard it is to believe in your own talent and the unexpected influences that bring us into ourselves along the way.",
          isbn: "9780385696005",
          language: "en",
          link: "https://books.google.com/books/about/Luster.html?hl=&id=eJ06zQEACAAJ",
          pageCount: 240,
          printType: "BOOK",
          publishedDate: "2020-08-04",
          status: "started",
          thumbnail:
            "https://books.google.com/books/content?id=eJ06zQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          title: "Luster",
        },
      ])
    );
    const exportVariableSpy = jest.spyOn(core, "exportVariable");
    const setFailedSpy = jest.spyOn(core, "setFailed");
    jest
      .spyOn(core, "getInput")
      .mockImplementationOnce(() => "my-library.json");
    Object.defineProperty(github, "context", {
      value: {
        payload: {
          inputs: {
            bookIsbn: "9780385696005",
            dateFinished: "2022-10-03",
            rating: "⭐️⭐️⭐️⭐️⭐️",
          },
        },
      },
    });
    await read();
    expect(exportVariableSpy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "BookStatus",
          "finished",
        ],
        [
          "NumberOfBooks",
          1,
        ],
        [
          "BookTitle",
          "Luster",
        ],
      ]
    `);
    expect(setFailedSpy).not.toHaveBeenCalled();
    expect(returnWriteFile.mock.calls[0]).toMatchInlineSnapshot(`
      [
        "my-library.json",
        [
          {
            "authors": [
              "Raven Leilani",
            ],
            "dateAdded": "2022-10-01",
            "dateFinished": "2022-10-03",
            "dateStarted": "2022-10-02",
            "description": "Sharp, comic, disruptive, tender, Raven Leilani's debut novel, Luster, sees a young black woman fall into art and someone else's open marriage. Edie is stumbling her way through her twenties--sharing a subpar apartment in Bushwick, clocking in and out of her admin job, making a series of inappropriate sexual choices. She's also, secretly, haltingly, figuring her way into life as an artist. And then she meets Eric, a digital archivist with a family in New Jersey, including an autopsist wife who has agreed to an open marriage--with rules. As if navigating the constantly shifting landscapes of contemporary sexual manners and racial politics weren't hard enough, Edie finds herself unemployed and falling into Eric's family life, his home. She becomes a hesitant friend to his wife and a de facto role model to his adopted daughter. Edie is the only black woman who young Akila knows. Razor sharp, darkly comic, sexually charged, socially disruptive, Luster is a portrait of a young woman trying to make her sense of her life in a tumultuous era. It is also a haunting, aching description of how hard it is to believe in your own talent and the unexpected influences that bring us into ourselves along the way.",
            "isbn": "9780385696005",
            "language": "en",
            "link": "https://books.google.com/books/about/Luster.html?hl=&id=eJ06zQEACAAJ",
            "pageCount": 240,
            "printType": "BOOK",
            "publishedDate": "2020-08-04",
            "rating": "⭐️⭐️⭐️⭐️⭐️",
            "status": "finished",
            "thumbnail": "https://books.google.com/books/content?id=eJ06zQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "title": "Luster",
          },
        ],
      ]
    `);
  });
});

describe("workflow, bulk add", () => {
  test("want to read", async () => {
    jest.spyOn(promises, "readFile").mockResolvedValue();
    jest.useFakeTimers().setSystemTime(new Date("2022-10-01T12:00:00"));

    const exportVariableSpy = jest.spyOn(core, "exportVariable");
    const setFailedSpy = jest.spyOn(core, "setFailed");
    jest
      .spyOn(core, "getInput")
      .mockImplementationOnce(() => "my-library.json");
    jest
      .spyOn(core, "getInput")
      .mockImplementation((v) => (v === "timeZone" ? "America/New_York" : ""));
    Object.defineProperty(github, "context", {
      value: {
        payload: {
          inputs: {
            bookIsbn: "9780385696005,9780593446065",
          },
        },
      },
    });
    await read();
    expect(exportVariableSpy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "BookStatus",
          "want to read",
        ],
        [
          "NumberOfBooks",
          2,
        ],
        [
          "BookTitle-0",
          "Luster",
        ],
        [
          "BookThumbOutput-0",
          "book-9780385696005.png",
        ],
        [
          "BookThumb-0",
          "https://books.google.com/books/content?id=NFeTEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        ],
        [
          "BookTitle-1",
          "Lucy by the Sea",
        ],
        [
          "BookThumbOutput-1",
          "book-9780593446065.png",
        ],
        [
          "BookThumb-1",
          "https://books.google.com/books/content?id=xwhlEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        ],
      ]
    `);
    expect(setFailedSpy).not.toHaveBeenCalled();
    expect(returnWriteFile.mock.calls[0]).toMatchInlineSnapshot(`
      [
        "my-library.json",
        [
          {
            "authors": [
              "Raven Leilani",
            ],
            "categories": [
              "Fiction",
            ],
            "dateAdded": "2022-10-01",
            "dateFinished": undefined,
            "dateStarted": undefined,
            "description": "NEW YORK TIMES BESTSELLER Winner of the 2020 Center for Fiction First Novel Prize Winner of the 2020 National Book Critics Circle's John Leonard Prize for Best First Book Winner of the 2020 Kirkus Prize for Fiction Winner of the 2021 Dylan Thomas Prize Finalist for the 2021 PEN/Hemingway Award for Best First Novel Longlisted for the 2021 Andrew Carnegie Medal for Excellence in Fiction Longlisted for the 2021 PEN/Jean Stein Book Award Longlisted for the 2021 Women's Prize for Fiction A New York Times Notable Book of the Year Named Best Book of the Year by O: the Oprah Magazine, Vanity Fair, Los Angeles Times, Town and Country, Amazon, Indigo, NPR, Harper’s Bazaar, Kirkus Reviews, Marie Claire, Good Housekeeping Sharp, comic, disruptive, and tender, Luster sees a young Black woman fall into art and someone else's open marriage. Edie is stumbling her way through her twenties—sharing a subpar apartment in Bushwick, clocking in and out of her admin job, making a series of inappropriate sexual choices. She's also, secretly, haltingly, figuring her way into life as an artist. And then she meets Eric, a digital archivist with a family in New Jersey, including an autopsist wife who has agreed to an open marriage—with rules. As if navigating the constantly shifting landscapes of contemporary sexual manners and racial politics weren't hard enough, Edie finds herself unemployed and falling into Eric's family life, his home. She becomes a hesitant friend to his wife and a de facto role model to his adopted daughter. Edie is the only Black woman who young Akila knows. Razor-sharp, darkly comic, sexually charged, socially disruptive, Luster is a portrait of a young woman trying to make sense of her life in a tumultuous era. It is also a haunting, aching description of how hard it is to believe in your own talent and the unexpected influences that bring us into ourselves along the way.",
            "isbn": "9780385696005",
            "language": "en",
            "link": "https://books.google.com/books/about/Luster.html?hl=&id=NFeTEAAAQBAJ",
            "pageCount": 0,
            "printType": "BOOK",
            "publishedDate": "2020-08-04",
            "status": "want to read",
            "thumbnail": "https://books.google.com/books/content?id=NFeTEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "title": "Luster",
          },
          {
            "authors": [
              "Elizabeth Strout",
            ],
            "categories": [
              "Fiction",
            ],
            "dateAdded": "2022-10-01",
            "dateFinished": undefined,
            "dateStarted": undefined,
            "description": "NEW YORK TIMES BESTSELLER • From Pulitzer Prize–winning, #1 New York Times bestselling author Elizabeth Strout comes a poignant, pitch-perfect novel about a divorced couple stuck together during lockdown—and the love, loss, despair, and hope that animate us even as the world seems to be falling apart. “No novelist working today has Strout’s extraordinary capacity for radical empathy. . . . May droves of readers come to feel enlarged, comforted, and genuinely uplifted by Lucy’s story.”—The Boston Globe ONE OF THE BEST BOOKS OF THE YEAR: The New Yorker With her trademark spare, crystalline prose—a voice infused with “intimate, fragile, desperate humanness” (The Washington Post)—Elizabeth Strout turns her exquisitely tuned eye to the inner workings of the human heart, following the indomitable heroine of My Name Is Lucy Barton through the early days of the pandemic. As a panicked world goes into lockdown, Lucy Barton is uprooted from her life in Manhattan and bundled away to a small town in Maine by her ex-husband and on-again, off-again friend, William. For the next several months, it’s just Lucy, William, and their complex past together in a little house nestled against the moody, swirling sea. Rich with empathy and emotion, Lucy by the Sea vividly captures the fear and struggles that come with isolation, as well as the hope, peace, and possibilities that those long, quiet days can inspire. At the heart of this story are the deep human connections that unite us even when we’re apart—the pain of a beloved daughter’s suffering, the emptiness that comes from the death of a loved one, the promise of a new friendship, and the comfort of an old, enduring love.",
            "isbn": "9780593446065",
            "language": "en",
            "link": "https://books.google.com/books/about/Lucy_by_the_Sea.html?hl=&id=xwhlEAAAQBAJ",
            "pageCount": 305,
            "printType": "BOOK",
            "publishedDate": "2022-09-20",
            "status": "want to read",
            "thumbnail": "https://books.google.com/books/content?id=xwhlEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "title": "Lucy by the Sea",
          },
        ],
      ]
    `);
  });
});
