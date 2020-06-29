"use strict";
// Node Modules
const express = require("express");
const router = express.Router();

// App Modules
const User = require('../Models/User');

//swagger ui modules
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Loltix API Documentation",
      version: "1.0.0",
      description:
        "LolTix",
      license: {
        name: "None",
        url: "https://loltix.com"
      },
      contact: {
        name: "Swagger",
        url: "https://swagger.io",
        email: "Info@SmartBear.com"
      }
    },
    servers: [
      {
        url: "http://api.loltix.com:8000/mocks"
      }
    ]
  },
  apis: [
    "./Models/User.js",
    "./Mocks/index.js"
  ]
};

const specs = swaggerJsdoc(options);
router.use("/docs", swaggerUi.serve);
router.get(
  "/docs",
  swaggerUi.setup(specs, {
    explorer: true
  })
);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * path:
 *  /users/:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post("/users", (req, res, next) => {
  const { email, name } = req.body;
  const user = new User(name, email);
  res.json(user);
});

/**
 * @swagger
 * path:
 *  /users/{userId}:
 *    get:
 *      summary: Get a user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the user
 *      responses:
 *        "200":
 *          description: An users object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.get("/users", (req, res, next) => {
  const userOne = new User("Alex", "fake@gmail.com");
  const userTwo = new User("Chad", "fakeagain@gmail.com");
  res.json({ userOne, userTwo });
});


router.get('/events', (req, res, next) => {
  let offset = req.query.offset;
  let pageSize = req.query.pageSize;

  if(!pageSize){
    pageSize = 2;
  } else {
    pageSize = parseInt(pageSize);
  }

  if(!offset){
    offset = 0;
  } else {
    offset = parseInt(offset);
  }

  let events =
  {
    results: [
      {
        id: "11111",
        name: "Trenton Davis",
        avatarUrl: "https://www.fillmurray.com/173/151",
        description:
          "Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.   Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.   Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  ",
        venueName: "Laffs Comedy Cafe",
        venueLocation: "Tuscon",
        showDates: [
          {
            day: "Wednesday, August 17th",
            times: "8:00 PM, 9:30 PM"
          },
          {
            day: "Thursday, August 18th",
            times: "8:00 PM, 9:30 PM"
          }
        ],
        ctaText: "TICKETS $12.50+"
      },
      {
        id: "2222",
        name: "Peter Andrews",
        avatarUrl: "https://www.fillmurray.com/173/154",
        description:
          "Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.   Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.   Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  ",
        venueName: "Laffs Comedy Cafe",
        venueLocation: "Tuscon",
        showDates: [
          {
            day: "Wednesday, August 17th",
            times: "8:00 PM, 9:30 PM"
          },
          {
            day: "Thursday, August 18th",
            times: "8:00 PM, 9:30 PM"
          }
        ],
        ctaText: "TICKETS $12.50+"
      },
      {
        id: "213213",
        name: "Jim Davis",
        avatarUrl: "https://www.fillmurray.com/173/152",
        description:
          "Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.   Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.   Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  ",
        venueName: "Club Congress",
        venueLocation: "Tuscon",
        showDates: [
          {
            day: "Wednesday, August 17th",
            times: "8:00 PM, 9:30 PM"
          },
          {
            day: "Thursday, August 18th",
            times: "8:00 PM, 9:30 PM"
          }
        ],
        ctaText: "TICKETS $12.50+"
      },
      {
        id: "4444",
        name: "jerry Davis",
        avatarUrl: "https://www.fillmurray.com/173/153",
        description:
          "Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.   Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.   Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.  ",
        venueName: "Fox Theatre",
        venueLocation: "Tuscon",
        showDates: [
          {
            day: "Wednesday, August 17th",
            times: "8:00 PM, 9:30 PM"
          }
        ],
        ctaText: "TICKETS $12.50+"
      }
    ],
    total: 4,
    offset: 2,
    hasMore: true,
  }
  if(offset && offset > 0) {
    events.results = events.results.slice(offset);
    events.offset = offset + pageSize;
    if(events.offset > events.total) {
      events.offset = events.total;
    }
  }
  if(pageSize && pageSize > 0){
    events.results.length=pageSize;
  }
  if(offset >= events.total) {
    events.results = [];
  }

  res.json(events);
});

router.get('/events/:id', (req, res, next) => {
  const eventDetails = [
    {
    name: "Frankie Quinones",
    id: 123,
    imageUrl: "https://www.fillmurray.com/250/200",
    dateStart: "Saturday, August 17",
    dateEnd: "Sunday August 18",
    venue: {
      name: "Laffs Comedy Caffé",
      position: [32.2, -110.6],
      location: "Tucson, AZ",
      address: "2900 E Broadway Blvd, Tucson, AZ 85716",
      logoUrl: "https://i.picsum.photos/id/512/120/120.jpg",
      webUrl: "http://laffstuscon",
      phoneNumber: "(520) 323-8869"
    },
    showDates: [
      { date: "2020-08-17T15:00:27.87+00:20", ticketUrl: "/" },
      { date: "2020-08-18T15:00:27.87+00:20", ticketUrl: "/" },
      { date: "2020-08-19T15:00:27.87+00:20", ticketUrl: "/" },
      { date: "2020-08-20T15:00:27.87+00:20", ticketUrl: "/" }
    ],
    details: [
      "Ages 21+",
      "General Admission",
      "Doors open 30 min prior to show",
      "2 item minimum"
    ],
    descriptionText: [
      "After becoming an accomplished stand up comedian, Chappelle  debuted his own weekly sketch comedy show on Comedy Central called Chappelle's Show.",
      "In April 2007, Chappelle set a stand up endurance record at the Laugh Factory comedy club, beating comedian Dane Cook's record of three hours and 50 minutes."
    ],
    videoLink: "https://www.youtube.com/embed/D80NLUcixPg",
    performers: [
      {
        avatarUrl: "https://www.fillmurray.com/100/100",
        name: "Performer 1"
      },
      {
        avatarUrl: "https://www.fillmurray.com/100/102",
        name: "Performer 2"
      },
      {
        avatarUrl: "https://www.fillmurray.com/100/101",
        name: "Performer 3"
      }
    ],
    otherShows: [
      {
        image: "https://www.fillmurray.com/100/100",
        name: "James Brown",
        link: "#"
      },
      {
        image: "https://www.fillmurray.com/100/102",
        name: "Phil Murray",
        link: "#"
      },
      {
        image: "https://www.fillmurray.com/100/104",
        name: "Chris Brown",
        link: "#"
      },
      {
        image: "https://www.fillmurray.com/100/103",
        name: "Darius Rucker",
        link: "#"
      },
      {
        image: "https://www.fillmurray.com/100/101",
        name: "Gabriel Iglesias",
        link: "#"
      }
    ],
    socialLinks: {
      facebook: "http://facebook.com/asdfasdfasdfsd",
      twitter: "http://twitter.com/asdfasdfasdfasdfsadf",
      email: "foo@bar.com"
    }
  },
  {
    name: "Frankie Quinones",
    id: 124,
    imageUrl: "https://www.fillmurray.com/250/200",
    dateStart: "Saturday, August 24",
    dateEnd: "Sunday August 25",
    venue: {
      name: "Laffs Comedy Caffé",
      position: [32.2, -110.6],
      location: "Tucson, AZ",
      address: "2900 E Broadway Blvd, Tucson, AZ 85716",
      logoUrl: "https://i.picsum.photos/id/512/120/120.jpg",
      webUrl: "http://laffstuscon",
      phoneNumber: "(520) 323-8869"
    },
    showDates: [
      { date: "2020-08-24T15:00:27.87+00:20", ticketUrl: "/" },
      { date: "2020-08-15T15:00:27.87+00:20", ticketUrl: "/" }
    ],
    details: [
      "Ages 21+",
      "General Admission",
      "Doors open 30 min prior to show",
      "2 item minimum"
    ],
    descriptionText: [
      "After becoming an accomplished stand up comedian, Chappelle  debuted his own weekly sketch comedy show on Comedy Central called Chappelle's Show.",
      "In April 2007, Chappelle set a stand up endurance record at the Laugh Factory comedy club, beating comedian Dane Cook's record of three hours and 50 minutes."
    ],
    videoLink: "https://www.youtube.com/embed/D80NLUcixPg",
    performers: [
      {
        avatarUrl: "https://www.fillmurray.com/100/100",
        name: "Performer 1"
      },
      {
        avatarUrl: "https://www.fillmurray.com/100/102",
        name: "Performer 2"
      }
    ],
    otherShows: [
      {
        image: "https://www.fillmurray.com/100/100",
        name: "Chris Rock",
        link: "#"
      },
      {
        image: "https://www.fillmurray.com/100/102",
        name: "Phil Plat",
        link: "#"
      },
      {
        image: "https://www.fillmurray.com/100/104",
        name: "Chris Brown",
        link: "#"
      },
      {
        image: "https://www.fillmurray.com/100/103",
        name: "Darius Rucker",
        link: "#"
      },
      {
        image: "https://www.fillmurray.com/100/101",
        name: "Gabriel Iglesias",
        link: "#"
      }
    ],
    socialLinks: {
      facebook: "http://facebook.com/asdfasdfasdfsd",
      twitter: "http://twitter.com/asdfasdfasdfasdfsadf",
      email: "foo@bar.com"
    }
  }
];
if(req.params.id == '123') {
  res.json(eventDetails[0]);
} else if(req.params.id == '124') {
  res.json(eventDetails[1]);
} else {
  res.sendStatus(404);
}
  
});

// catch 404 and forward to error handler
router.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error Handler
router.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = router;
