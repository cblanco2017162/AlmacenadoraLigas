const Torneo = require('../models/torneos.model');

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

     Equipos.findOneAndDelete({_id : idEquipo, idUsuario : req.user.sub}, (err, equipoEliminado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!equipoEliminado) return res.status(404).send( { mensaje: 'No puede eliminar equipos pertenecientes a otro torneo'});

        return res.status(200).send({ equipo: equipoEliminado});
    })
}

module.exports = {
    agregarTorneos,
    editarTorneos
}