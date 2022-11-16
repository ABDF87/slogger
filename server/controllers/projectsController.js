const Project = require('../model/Project')

const getAllProjects = async (req, res) => {
  
  
    const projects = await Project.find();
 
    // add in brackets a condition
    if (!projects) return res.status(204).json({ 'message': 'No projects found.' });
    res.json(projects);
}

const createNewProject = async (req, res) => {
    if(req) console.log(req)
    if (  !req?.body?.projectid || !req?.body?.userid) {
        return res.status(400).json({ 'message': 'User id and project name are required' });
    }

    try {
        const result = await Project.create({
            userid: req.body.userid,
            projectname: req.body.projectname,
            projectid: req.body.projectid,
            isActive:  req.body.isActive,
            timeproject: req.body.timeproject

        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateProject = async (req, res) => {
    if (!req?.body?.projectid) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const project = await Project.findOne({ projectid: req.body.projectid }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No project matches ID ${req.body.projectid}.` });
    }
    // if (req.body?.userid) project.userid = req.body.userid;
    if (req.body?.projectname) project.projectname = req.body.projectname;
    if (req.body?.projectid) project.projectid = req.body.projectid;
    // if (req.body?.isActive) project.isActive = req.body.isActive;

    const result = await project.save();
    res.json(result);
}

const deleteProject = async (req, res) => {
    if (!req?.body?.projectid) return res.status(400).json({ 'message': 'Project ID required.' });

    const project = await Project.findOne({ projectid: req.body.projectid }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No project matches ID ${req.body.projectid}.` });
    }
    const result = await project.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getProject = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Project ID required.' });

    const project = await Project.find({ userid: req.params.id }).exec();

    if (!project) {
        return res.status(204).json({ "message": `No project matches ID ${req.params.id}.` });
    }
    res.json(project);
}

module.exports = {
    getAllProjects,
    createNewProject,
    updateProject,
    deleteProject,
    getProject
}