import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },

    descripcion: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    },

    categoria: {
      type: String,
      required: true,
      enum: [
        'computadoras',
        'telefonos',
        'accesorios',
        'combos'
      ]
    },

    precio: {
      type: Number,
      required: true,
      min: 0,
      max: 1000000
    },

    precioAnterior: {
      type: Number,
      default: 0,
      min: 0,
      max: 1000000
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
      max: 1000000,
      validate: Number.isInteger
    },

    detalles: {
      type: String,
      default: '',
      maxlength: 2000
    },

    procesador: {
      type: String,
      default: '',
      maxlength: 100
    },

    ram: {
      type: String,
      default: '',
      maxlength: 100
    },

    almacenamiento: {
      type: String,
      default: '',
      maxlength: 100
    },

    camara: {
      type: String,
      default: '',
      maxlength: 100
    },

    red: {
      type: String,
      default: '',
      maxlength: 100
    },

    etiqueta: {
      type: String,
      default: 'Disponible',
      maxlength: 60
    },

    destacado: {
      type: Boolean,
      default: false
    },

    oferta: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model(
  'Recurso',
  schema
)