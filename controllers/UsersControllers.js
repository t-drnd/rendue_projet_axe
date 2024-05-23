import prisma from "../config/prisma.js";
import { hashPassword } from "../utils/bcrypt.js";

class UsersController {
  getMyProfile(req, res) {
    const user = req.user;
    return res.status(200).send(user);
  }

  async index(req, res) {
    const users = await prisma.user.findMany();
    return res.status(200).send(users);
  }

  async store(req, res) {
    try {
      const body = req.body;
      const existingUser = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });

      if (existingUser) {
        return res.status(409).send("User already exists");
      }

      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: await hashPassword(body.password),
        },
      });
      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  async show(req, res) {
    try {
      const id = parseInt(req.params.id);
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!user) {
        return res.status(404).send("User not found");
      }
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const body = req.body;
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!user) {
        return res.status(404).send("User not found");
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: body,
      });

      return res.status(200).send(updatedUser);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async destroy(req, res) {
    try {
      const id = parseInt(req.params.id);
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!user) {
        return res.status(404).send("User not found");
      }

      await prisma.user.delete({
        where: {
          id: id,
        },
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export default new UsersController();
