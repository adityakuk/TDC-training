import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import "reflect-metadata";
import { Query } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Resolver()
export class PersonResolver {
  @Query(() => [Person])
  async getPerson(): Promise<Person[]> {
    return await Person.find();
  }

  @Mutation(() => Boolean)
  async addPerson(@Arg("Name") Name: string): Promise<Boolean> {
    await Person.create({ Name }).save();
    return true;
  }

  @Mutation(() => Person)
  async UpdatePerson(
    @Arg("id") id: string,
    @Arg("Name") Name: string
  ): Promise<Person> {
    const person = await Person.findOne({ where: { id } });
    if (!person) throw new Error("Person not found");
    person.Name = Name;
    await person.save();
    return person;
  }

  @Mutation(() => Boolean)
  async deletePerson(@Arg("id") id: string): Promise<boolean> {
    const DelPerson = await Person.findOne({ where: { id } });
    if (!DelPerson) throw new Error("Person not found");
    await DelPerson.remove();
    return true;
  }
}
