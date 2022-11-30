import { exportVariable, getInput, setFailed } from "@actions/core";
import * as github from "@actions/github";
import isbn from "node-isbn";
import returnWriteFile from "./write-file";
import getBook from "./get-book";
import { getBookStatus, getDates, sortByDate, toArray } from "./utils";
import { checkOutBook } from "./checkout-book";
import { updateBook } from "./update-book";
import { BookStatus } from "./clean-book";
import returnReadFile from "./read-file";
import { validatePayload } from "./validate-payload";

export type Dates = {
  dateAdded: string | undefined;
  dateStarted: string | undefined;
  dateFinished: string | undefined;
};

export type BookPayload = {
  dateStarted: string | undefined;
  dateFinished: string | undefined;
  notes?: string;
  bookIsbn: string;
  rating?: string;
  tags?: string;
};

export type ActionInputs = {
  readFileName: string;
  providers: string[];
  rating?: string;
  timeZone: string;
};

export type BookParams = {
  fileName: string;
  bookIsbn: BookPayload["bookIsbn"];
  dates: Dates;
  notes?: BookPayload["notes"];
  bookStatus: BookStatus;
  providers?: ActionInputs["providers"];
  rating?: ActionInputs["rating"];
  tags?: string[];
};

export async function read() {
  try {
    // Get book payload
    const payload = github.context.payload.inputs as BookPayload;
    // Validate payload
    validatePayload(payload);
    const { bookIsbn, dateFinished, dateStarted, notes, rating, tags } =
      payload;
    // Set inputs
    const fileName: ActionInputs["readFileName"] = getInput("readFileName");
    const providers: ActionInputs["providers"] = getInput("providers")
      ? getInput("providers").split(",")
      : isbn._providers;

    const bookStatus = getBookStatus(dateStarted, dateFinished);
    exportVariable("BookStatus", bookStatus);
    const dates = getDates(bookStatus, dateStarted, dateFinished);

    let library = await returnReadFile(fileName);

    const books = bookIsbn.split(",");

    exportVariable(`NumberOfBooks`, books.length);

    for (const [index, isbn] of books.entries()) {
      const bookParams: BookParams = {
        fileName,
        dates,
        notes,
        bookIsbn: isbn,
        bookStatus,
        rating,
        providers,
        ...(tags && { tags: toArray(tags) }),
      };

      const bookExists = checkOutBook(bookParams, library);

      if (bookExists) {
        library = await updateBook(bookParams, library);
      } else {
        const newBook = await getBook(bookParams);
        library.push(newBook);
        // How to make this work for multiple books without overriding
        exportVariable(`BookTitle-${index}`, newBook.title);
        exportVariable(`BookThumbOutput-${index}`, `book-${newBook.isbn}.png`);
        exportVariable(`BookThumb-${index}`, newBook.thumbnail);
      }
    }

    await returnWriteFile(fileName, sortByDate(library));
  } catch (error) {
    setFailed(error.message);
  }
}

export default read();
