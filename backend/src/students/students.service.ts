import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

export interface StudentResponse {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
}

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}

  async findAll(): Promise<StudentResponse[]> {
    const docs = await this.studentModel.find().sort({ createdAt: -1 }).exec();
    return docs.map((doc: StudentDocument) => this.toResponse(doc));
  }

  async findOne(id: string): Promise<StudentResponse> {
    const doc = await this.studentModel.findById(id).exec();
    if (!doc) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return this.toResponse(doc);
  }

  async create(dto: CreateStudentDto): Promise<StudentResponse> {
    const created = new this.studentModel(dto);
    const saved = await created.save();
    return this.toResponse(saved);
  }

  async update(id: string, dto: UpdateStudentDto): Promise<StudentResponse> {
    const updated = await this.studentModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return this.toResponse(updated);
  }

  async remove(id: string): Promise<void> {
    const res = await this.studentModel.findByIdAndDelete(id).exec();
    if (!res) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
  }

  private toResponse(doc: StudentDocument): StudentResponse {
    const obj = doc.toObject({ versionKey: false });
    return {
      id: obj._id.toString(),
      name: obj.name,
      email: obj.email,
      age: obj.age,
      createdAt: obj.createdAt,
    };
  }
}

