const Equipos = require('../models/equipos.model');
const Torneo = require('../models/torneos.model');

function agregarEquipos(req, res){
    var parametros = req.body;
    var equipoModelo = new Equipos
    
    if( parametros.nombre) {
         equipoModelo.nombre = parametros.nombre;
         equipoModelo.puntos = 0;
         equipoModelo.idUsuario = req.user.sub;

                 equipoModelo.save((err, equipoGuardado) => {
                       if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
                       if(!equipoGuardado) return res.status(404).send( { mensaje: "Error, no se agrego ningun equipo"});

                 return res.status(200).send({ equipo: equipoGuardado });
        })
    }

}

function editarEquipos(req, res){
    var idEquipo = req.params.idEquipo;
    var parametros = req.body;    

     Equipos.findOneAndUpdate({_id : idEquipo, idUsuario : req.user.sub}, parametros, {new : true}, (err, equipoActualizado)=>{
            if(err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if(!equipoActualizado) return res.status(500)
                .send({ mensaje: 'No puede editar equipos de otro usuario'});
            
            return res.status(200).send({ equipo : equipoActualizado })
        });
}

function eliminarEquipos(req, res){
    var idEquipo = req.params.idEquipo;

     Equipos.findOneAndDelete({_id : idEquipo, idUsuario : req.user.sub}, (err, equipoEliminado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!equipoEliminado) return res.status(404).send( { mensaje: 'No puede eliminar equipos pertenecientes a otro usuario'});

        return res.status(200).send({ equipo: equipoEliminado});
    })
}

function verEquipos(req, res) {

    Equipos.find({ idUsuario: req.user.sub }, (err, equiposEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" })
        if (!equiposEncontrados) return res.status(500).send({ mensaje: "No se pudo visualizar" })
        return res.status(200).send({ TablaEquipos: equiposEncontrados })
    }).populate('idUsuario idTorneo', 'nombre')
}

module.exports = {
    agregarEquipos,
    editarEquipos,
    eliminarEquipos,
    verEquipos
}