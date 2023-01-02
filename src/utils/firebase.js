import app from './firebase.config'
import { getFirestore, collection, doc, deleteDoc, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

const db = getFirestore(app);

export default class baseApp {
    async create({sessao, token}){
        try {
            const docRef = await addDoc(collection(db, "sessao"),{
                sessao: sessao,
                token: token,
                timestamp: serverTimestamp()
            });
            return `Documento criado seu ID é: ${docRef.id}`
        }catch(e){
            return `Erro ao adicionar o documento: ${e}`
        }
    }
    async listar(){
        let data = []
        const querySnapshot = await getDocs(collection(db, "sessao"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push({id: doc.id, sessao: doc.data().sessao, token: doc.data().token, data: doc.data().timestamp})
        });
        return data
    }
    async deletar(id){
        await deleteDoc(doc(db, "sessao", id))
    }
}