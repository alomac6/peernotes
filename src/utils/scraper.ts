import puppeteer from 'puppeteer';

type course = {
    department: string | null; // CSE
    code: string | null; // 1325
    course_name: string | null; // Object oriented 
}

// // returns array of strings like ["Accounting (ACCT)", ""]
// async function scrapeDepartments() {

//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     await page.goto('https://catalog.uta.edu/coursedescriptions/');

//     const selector: string = '#content-container .wrap #col-content #contentarea #textcontainer .sitemap ul li';
    
//     const limit: number = 3;

//     const items: string[] = await page.$$eval(selector, (elements: Element[]) =>
//         elements.map(element => element.textContent?.trim() || '')
//     );

//     await browser.close();
//     return items;

// }

// only returns first 2 departments for now
async function scrapeDepartments() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://catalog.uta.edu/coursedescriptions/');

    const selector: string = '#content-container .wrap #col-content #contentarea #textcontainer .sitemap ul li';
    const limit: number = 2; // only take first 2 departments

    const items: string[] = await page.$$eval(selector, (elements: Element[], limit: number) => 
        Array.from(elements)           // convert NodeList to array
             .slice(0, limit)         // take only first `limit` items
             .map(el => el.textContent?.trim() || '')
    , limit); // pass limit as second argument to $$eval

    await browser.close();
    return items;
}

async function scrapeCoursesForDepartment(dep: string): Promise<string[]> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`https://catalog.uta.edu/coursedescriptions/${dep}`, {
        waitUntil: "domcontentloaded",
    });

    const selector = "#content-container .wrap #col-content #contentarea #courseinventorycontainer .courses .courseblock .courseblocktitle strong";

    // return an array of text from all <strong> elements
    const courses: string[] = await page.$$eval(selector, (elements: Element[]) =>
        Array.from(elements).map(el => el.textContent?.trim() || "")
    );

    await browser.close();
    return courses; // now you can console.log outside
}

function parseCourse(courseStr: string): course {

    // Tokenize DEPT CODE. COURSE NAME. anything else
    const regex = /^([A-Z]+)\s+(\d+)\.\s+(.+?)\./;
    const match = courseStr.match(regex);

    if (!match) {
        return { department: null, code: null, course_name: null };
    }

    const [, department, code, course_name] = match;

    return { department, code, course_name };
}

// need another function to return
async function scrapeCourses() {

    try {
        const scrapedDepartments: string[] = await scrapeDepartments();

        for (const department of scrapedDepartments) {
            // make a call 
            const code: string = department.split('(')[1].split(')')[0].toLowerCase();
            console.log(`Fetching courses for ${code}`);

            // get courses for this department
            const courses = await scrapeCoursesForDepartment(code);

            // log the returned courses array
            console.log(`Courses for ${code}:`);

            // tokenize it and return object
            const coursesTrimmed: course[] = courses.map(courseStr => parseCourse(courseStr));
    
            console.log(coursesTrimmed);
            // [{department: 'CSE', code: '1320', course_name: "OOP"}, {}]
        }

    } catch (e) {
        console.error(e);
    }

};

scrapeCourses();


