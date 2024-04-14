const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNum: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    role: {
        type: String,
        default: "Student"
    },
    examResult: [
        {
            subName: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subject',
            },
            midsemMarks: {
                type: Number,
                default: 0
            },
            endsemMarks: {
                type: Number,
                default: 0
            },
            internalMarks: {
                type: Number,
                default: 0
            },
            marksObtained: {
                type: Number,
                default: 0
            }
        }
    ],
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true
        },
        subName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
            required: true
        }
    }]
});

// Define a pre-save hook to calculate and set marksObtained before saving
studentSchema.pre('save', function(next) {
    const { examResult } = this;
    if (!examResult || examResult.length === 0) {
        return next(); // If no exam results are available, skip calculation
    }
    examResult.forEach(result => {
        const { midsemMarks, endsemMarks, internalMarks } = result;
        // Calculate marksObtained based on the provided formula
        result.marksObtained = Math.ceil(midsemMarks / 2) + Math.ceil(endsemMarks / 2) + internalMarks;
    });
    next();
});

module.exports = mongoose.model("student", studentSchema);