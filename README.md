# Application requirements

## To register a car

**Functional Requirement**
It shall be possible to register a new car.
It shall be possible to list all categories.

**Business Rules**
It shall not be possible to register a car with an already used license plate.
It shall not be possible to change the license plate of an already registered car.
A car shall be registered as available, by default.
Only an admin user shall be able to register a car.


## To list cars

**Functional requirement**
It shall be possible to list all available cars.
It shall be possible to list all available cars by category name.
It shall be possible to list all available cars by model name.
It shall be possible to list all available cars by brand.

**Business Rules**
User does not need to be logged in the system.


## To associate a specification to a car

**Functional requirement**
It shall be possible to associate a specification to a car.
It shall be possible to list all specifications.
It shall be possible to list all cars.

**Business rules**
It shall not be possible to associate a specification to a not registered car.
It shall not be possible to associate a specification to a car that has been already associated to the same specification
Only an admin user shall be able to associate a specification to a car.


## To register car images

**Functional requirements**
It shall be possible to register an image of a car.
It shall be possible to list all cars.

**Non-functional requirements**
Use multer for file upload.

**Business rules**
The user shall be able to register more than one image to the same car.
Only an admin user shall be able to register an image to a car.


## To register a car rent

**Functional requirements**
It shall be possible to register a car rent.

**Business rules**
The rent shall have a minimum duration of 24 hours.
It shall not be possible to an user to register a new rent if he already has one active.
It shall not be possible to register the rent of a car if it already has one active.