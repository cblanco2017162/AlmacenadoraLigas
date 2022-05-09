const Torneo = require('../models/torneos.model');
const Jornada = require ('../models/jornadas.model');
const Equipo = require('../models/equipos.model');
//const Asignacion = require('../models/asignarEquipo.model')

function agregarTorneos(req, res){
    var parametros = req.body;
    var torneoModelo = new Torneo
    
    if( parametros.nombreTorneo && parametros.equiposTotal) {
        torneoModelo.nombreTorneo = parametros.nombreTorneo;
        torneoModelo.equiposTotal = parametros.equiposTotal;
        torneoModelo.idUsuario = req.user.sub;

                 torneoModelo.save((err, torneoGuardado) => {
                       if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
                       if(!torneoGuardado) return res.status(404).send( { mensaje: "Error, no se agrego ningun torneo"});

                 return res.status(200).send({ Torneo: torneoGuardado });
        })
    }

}

function editarTorneos(req, res){
    var idTorneo = req.params.idTorneo;
    var parametros = req.body;    

     Torneo.findOneAndUpdate({_id : idTorneo, idUsuario : req.user.sub}, parametros, {new : true}, (err, torneoActualizado)=>{
            
        if(err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if(!torneoActualizado) return res.status(500)
                .send({ mensaje: 'No puede editar torneos de otros usuarios'});
            
            return res.status(200).send({ Torneo : torneoActualizado })
        });
}

function eliminarTorneos(req, res){
    var idEquipo = req.params.idEquipo;

     Torneo.findOneAndDelete({_id : idEquipo, idUsuario : req.user.sub}, (err, equipoEliminado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!equipoEliminado) return res.status(404).send( { mensaje: 'No puede eliminar equipos pertenecientes a otro torneo'});

        return res.status(200).send({ equipo: equipoEliminado});
    })
}

function obtenerTorneosPorNombre(req, res){
    var nombreTorn = req.params.nombreTorneo;

    Torneo.findOne( { nombre : { $regex: nombreTorn, $options: 'i' }}, (err, torneoEncontrado) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!torneoEncontrado) return res.status(404).send({ mensaje: "Error, ese torneo no existe" });

        return res.status(200).send({ Torneo: torneoEncontrado });
    })
}

/*function asignarEquipo(req, res){
    const parametros = req.body;
    const nombreEquipo = req.params.nombreEquipo;

    if (parametros.nombreTorneo){
        Asignacion.find({ idEquipo: nombreEquipo }).populate('idTorneo').exec((err, asignacionEncontrada)=>{

            if(asignacionEncontrada.length >= 10) return res.status(400).send({mensaje: 'No puede asignar mas de 10 equipos a un torneo'});

            for(let i = 0; i< asignacionEncontrada.length; i++){
                if(asignacionEncontrada[i].idTorneo.nombreTorneo === parametros.nombreTorneo) return res.status(400).send({mensaje: 'Ese equipo ya esta asignado a un torneo'});
            }

            Torneo.findOne({nombreTorneo: parametros.nombreTorneo}, (err, torneoEncontrado)=>{
                if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
                if(!torneoEncontrado) return res.status(404).send( { mensaje: 'Ese torneo no existe'});

                const modeloAsignacion = new Asignacion();
                modeloAsignacion.idTorneo = torneoEncontrado._id;
                modeloAsignacion.idEquipo = usuarioLogeado;

                modeloAsignacion.save((err, asignacionGuardada)=>{
                    if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
                    if(!asignacionGuardada) return res.status(404).send( { mensaje: 'No se pudo guardar la asignacion'});

                    return res.status(200).send({Asignacion: asignacionGuardada});
                })
            })
        })
    }else{
        return res.status(500).send({mensaje: 'Debe de enviar lo que se le solicita'});
    }
}*/

function agregarJornada(req,res){
    var parametros = req.body; 
    var partidoModel = new Jornada();

    var jornadaMax;
    var partidoMax;

    var puntosEquipo1;
    var puntosEquipo2;


    if(parametros.golesDeEquipo1,parametros.golesDeEquipo2,parametros.jornada){
        partidoModel.golesDeEquipo1 = parametros.golesDeEquipo1;
        partidoModel.golesDeEquipo2 = parametros.golesDeEquipo2;
        partidoModel.jornada = parametros.jornada; 
        partidoModel.idPrimerEquipo = parametros.idPrimerEquipo;
        partidoModel.idSegundoEquipo = parametros.idSegundoEquipo;
        
        Jornada.findOne({idPrimerEquipo:parametros.idPrimerEquipo,idSegundoEquipo:parametros.idSegundoEquipo,jornada:parametros.jornada},(err,partidoA)=>{
            if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if(!partidoA >= 1){
                Equipo.find((err,equipoB)=>{
                    if(equipoB.length % 2 ==0){
                        partidoMax = equipoB.length /2;
                        jornadaMax = (equipoB.length -1)/2;
                    }else{
                        partidoMax = (equipoB.length -1)/2;
                        jornadaMax = equipoB.length
                    }
                    if(parametros.jornada <= jornadaMax){
                        if(err) return res.status(500).send({mensaje:'error'})
                        partidoModel.save((err,partidoC)=>{
                            if(parametros.golesDeEquipo1>parametros.golesDeEquipo2){
                                puntosEquipo1 = 3;
                                puntosEquipo2 =0;
                            }else if(parametros.golesDeEquipo1 == parametros.golesDeEquipo2){
                                puntosEquipo1 = 1;
                                puntosEquipo2 = 1;

                            }else{
                                puntosEquipo1=0;
                                puntosEquipo2=3;
                            }
                            Equipo.findOneAndUpdate({_id:parametros.idPrimerEquipo},{$inc:{golesAfavor:parametros.golesDeEquipo1,
                            golesEnContra:parametros.golesDeEquipo2,cantidadDePartidos:1,diferencia:parametros.golesDeEquipo1 - parametros.golesDeEquipo2,puntos:puntosEquipo1}},(err)=>{
                                 if (err) return res.status(500).send({ mensaje: "Error" })

                            Equipo.findOneAndUpdate({_id:parametros.idSegundoEquipo},{$inc:{golesAfavor:parametros.golesDeEquipo2,
                            golesEnContra:parametros.golesDeEquipo1,cantidadDePartidos:1,diferencia:parametros.golesDeEquipo2 - parametros.golesDeEquipo1,puntos:puntosEquipo2}},(err)=>{
                                if (err) return res.status(500).send({ mensaje: "Error" });
                            })
                                
                            })
                            return res.status(200).send({partido:partidoC})
                        })
                    }else{
                        return res.status(500).send({mensaje:'La jornada es mayor a las disponibles'})
                    }
                })
            }else{
                return res.status(500).send({mensaje: 'Este partido ya existe'});
            }

        })
    }else{
        return res.status(500).send({ mensaje: "Llene todos los campos para continuar" });
    }
}

function crearPDF(req, res) {

    Equipo.find({idUsuario : req.user.sub}, (err, equipoEncontrado) => {
        if(err) return res.status(500)
        .send({ mensaje: 'Error en la peticion' });

        const fs = require('fs');
        const Pdfmake = require('pdfmake');

        var fonts = {
            Roboto: {
                normal: './fonts/Roboto-Regular.ttf',
                bold: './fonts/Roboto-Medium.ttf',
                italics: './fonts/Roboto-Italic.ttf',
                bolditalics: './fonts/Roboto-MediumItalic.ttf'
            }
        };

        let pdfmake = new Pdfmake(fonts);

        let content = [{
        text:  'Tabla de posiciones:',fontSize: 24, color: 'blue', italics: true, alignment : 'center',
        }]

        for (let i = 0; i < equipoEncontrado.length ; i++) {

            let array = i + 1;

            content.push({
                text:'Equipo No:'+array,
            })

            content.push({
                text:'Equipo :'+' '+equipoEncontrado[i].nombre+' - '+'Puntos: '+equipoEncontrado[i].puntos +' - '+'Diferencia de goles: '+equipoEncontrado[i].diferencia, color : 'gray',
            })

            content.push({
                text:' ',
            })
        }

        let docDefinition = {
            content: content
        }
    
        let pdfDoc = pdfmake.createPdfKitDocument(docDefinition, {});
        pdfDoc.pipe(fs.createWriteStream('.Tabla.pdf'));
        pdfDoc.end();
        return res.status(200).send({mensaje: 'pdf Creado'});

    })

}


module.exports = {
    agregarTorneos,
    editarTorneos,
    eliminarTorneos,
    obtenerTorneosPorNombre,
    agregarJornada,
    crearPDF
   //asignarEquipo
}