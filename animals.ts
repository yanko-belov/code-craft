abstract class Animal {
  constructor(public name: string) {}

  eat(): void {
    console.log(`${this.name} is eating`);
  }
}

abstract class FlyingAnimal extends Animal {
  fly(): void {
    console.log(`${this.name} is flying`);
  }
}

abstract class SwimmingAnimal extends Animal {
  swim(): void {
    console.log(`${this.name} is swimming`);
  }
}

class Bird extends FlyingAnimal {
  constructor(name: string) {
    super(name);
  }
}

class Fish extends SwimmingAnimal {
  constructor(name: string) {
    super(name);
  }
}

class Duck extends FlyingAnimal {
  constructor(name: string) {
    super(name);
  }

  swim(): void {
    console.log(`${this.name} is swimming`);
  }
}

const sparrow = new Bird("Sparrow");
sparrow.eat();
sparrow.fly();

const salmon = new Fish("Salmon");
salmon.eat();
salmon.swim();

const mallard = new Duck("Mallard");
mallard.eat();
mallard.fly();
mallard.swim();
